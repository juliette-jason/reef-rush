/**
 * Reef Rush — Approve / Dismiss feedback; Approve starts a Cursor Cloud Agent.
 *
 * Secrets (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):
 *   FEEDBACK_ADMIN_CODE              — owner code (e.g. miles)
 *   CURSOR_CLOUD_AGENT_API_KEY       — Cursor Cloud Agent API key (preferred)
 *   CURSOR_API_KEY                   — fallback name if the above isn’t set
 *   REEF_RUSH_REPO_URL               — optional, default https://github.com/juliette-jason/reef-rush
 *
 * Auto-provided: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, accept, cache-control, pragma",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Action = "unlock" | "approve" | "dismiss";

type Body = {
  action?: Action;
  adminCode?: string;
  clientId?: string;
  feedbackId?: number | string;
  playerName?: string;
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function buildAgentPrompt(row: {
  id: number;
  kind?: string;
  player_name?: string;
  created_at?: string;
  screenshot_url?: string;
  message?: string;
}) {
  const lines = [
    "You are fixing Reef Rush (static HTML/JS/CSS fishing game in this repo).",
    "Implement the player feedback below. Keep changes focused; match existing style.",
    "Do not add unrelated features. Prefer small, shippable diffs.",
    "",
    `Feedback id: ${row.id}`,
    `Kind: ${row.kind || "feedback"}`,
    `Player: ${row.player_name || "(none)"}`,
    `When: ${row.created_at || ""}`,
  ];
  if (row.screenshot_url) lines.push(`Screenshot: ${row.screenshot_url}`);
  lines.push("", "Feedback:", String(row.message || "").trim());
  return lines.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const adminCodeExpected = String(Deno.env.get("FEEDBACK_ADMIN_CODE") || "").trim();
  const cursorApiKey = String(
    Deno.env.get("CURSOR_CLOUD_AGENT_API_KEY") || Deno.env.get("CURSOR_API_KEY") || "",
  ).trim();
  const repoUrl =
    String(Deno.env.get("REEF_RUSH_REPO_URL") || "").trim() ||
    "https://github.com/juliette-jason/reef-rush";
  const supabaseUrl = String(Deno.env.get("SUPABASE_URL") || "").trim();
  const serviceKey = String(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "").trim();

  if (!adminCodeExpected) {
    return json(500, { error: "FEEDBACK_ADMIN_CODE secret is not set." });
  }
  if (!supabaseUrl || !serviceKey) {
    return json(500, { error: "Supabase service credentials missing." });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const action = (body.action || "approve") as Action;
  const adminCode = String(body.adminCode || "").trim();
  const clientId = String(body.clientId || "").trim();
  const playerName = String(body.playerName || "").trim();

  if (!adminCode || adminCode !== adminCodeExpected) {
    return json(401, { error: "Wrong owner code." });
  }
  if (!clientId || clientId.length < 8) {
    return json(400, { error: "Missing device id." });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (action === "unlock") {
    const { error } = await supabase.from("feedback_owner_devices").upsert(
      {
        client_id: clientId,
        label: playerName || "owner device",
      },
      { onConflict: "client_id" },
    );
    if (error) {
      return json(500, {
        error: error.message?.includes("feedback_owner_devices")
          ? "Run supabase/game_feedback_agent.sql in Supabase first."
          : error.message || "Could not register device.",
      });
    }
    return json(200, { ok: true, registered: true });
  }

  const { data: device, error: deviceErr } = await supabase
    .from("feedback_owner_devices")
    .select("client_id")
    .eq("client_id", clientId)
    .maybeSingle();

  if (deviceErr) {
    return json(500, {
      error: /feedback_owner_devices|schema cache|PGRST/i.test(deviceErr.message || "")
        ? "Run supabase/game_feedback_agent.sql in Supabase first."
        : deviceErr.message || "Device check failed.",
    });
  }
  if (!device) {
    return json(403, {
      error: "This device is not registered. Unlock once with your owner code first.",
    });
  }

  const feedbackId = Number(body.feedbackId);
  if (!Number.isFinite(feedbackId) || feedbackId <= 0) {
    return json(400, { error: "Missing feedback id." });
  }

  const { data: row, error: rowErr } = await supabase
    .from("game_feedback")
    .select("id,created_at,message,kind,player_name,screenshot_url,status,agent_id")
    .eq("id", feedbackId)
    .maybeSingle();

  if (rowErr || !row) {
    return json(404, { error: "Feedback not found." });
  }

  if (action === "dismiss") {
    const { error } = await supabase
      .from("game_feedback")
      .update({
        status: "dismissed",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", feedbackId);
    if (error) return json(500, { error: error.message || "Dismiss failed." });
    return json(200, { ok: true, status: "dismissed" });
  }

  if (action !== "approve") {
    return json(400, { error: "Unknown action." });
  }

  if (row.status === "approved" && row.agent_id) {
    return json(200, {
      ok: true,
      status: "approved",
      agentId: row.agent_id,
      alreadyStarted: true,
    });
  }

  if (!cursorApiKey) {
    return json(500, { error: "CURSOR_CLOUD_AGENT_API_KEY secret is not set." });
  }

  const promptText = buildAgentPrompt(row);
  const agentRes = await fetch("https://api.cursor.com/v1/agents", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${cursorApiKey}:`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: { text: promptText },
      name: `Reef Rush feedback #${row.id}`.slice(0, 100),
      repos: [{ url: repoUrl, startingRef: "main" }],
      autoCreatePR: true,
    }),
  });

  const agentText = await agentRes.text();
  let agentJson: Record<string, unknown> = {};
  try {
    agentJson = JSON.parse(agentText) as Record<string, unknown>;
  } catch {
    agentJson = {};
  }

  if (!agentRes.ok) {
    const detail =
      (typeof agentJson.message === "string" && agentJson.message) ||
      (typeof agentJson.error === "string" && agentJson.error) ||
      agentText.slice(0, 280) ||
      `Cursor API ${agentRes.status}`;
    return json(502, { error: `Could not start Cursor agent: ${detail}` });
  }

  const agentObj = (agentJson.agent as Record<string, unknown> | undefined) || agentJson;
  const agentId = String(agentObj.id || agentJson.id || "").trim();
  const agentUrl = String(
    agentObj.url || agentJson.url || (agentId ? `https://cursor.com/agents/${agentId}` : ""),
  ).trim();

  const { error: updErr } = await supabase
    .from("game_feedback")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
      agent_id: agentId,
      agent_url: agentUrl,
    })
    .eq("id", feedbackId);

  if (updErr) {
    return json(500, {
      error: updErr.message || "Agent started but failed to save status.",
      agentId,
      agentUrl,
    });
  }

  return json(200, {
    ok: true,
    status: "approved",
    agentId,
    agentUrl,
    alreadyStarted: false,
  });
});
