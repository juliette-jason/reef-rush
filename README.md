# reef-rush

## Friend party codes (no sign-in)

Play Duel or Co-op with a friend using an auto-generated code — no accounts.

1. Open [Supabase](https://supabase.com/dashboard) → **SQL Editor**
2. Run [`supabase/duel_matches.sql`](supabase/duel_matches.sql) if you haven’t already
3. Run [`supabase/duel_matches_party_code.sql`](supabase/duel_matches_party_code.sql)
4. Hard-refresh the live game

**Host:** Events → Duel/Co-op → Cast off → **Play with a friend** → share the on-screen code  
**Friend:** Events → **Enter friend code** → Join → pick gear → Cast off

### Duel black-screen guards

After changing duel/UI code, run:

```bash
node scripts/check-duel-guards.mjs
```

This checks the invariants that previously caused a black playfield after COM matchup (timer order, canvas sizing, repair helpers).

## Fishing Tourney (shared votes + 35 daily spots)

Events → **Fishing Tourney** votes sync across devices automatically (via the shared Supabase project). Prefer running [`supabase/fishing_tournament.sql`](supabase/fishing_tournament.sql) for dedicated vote/signup/score tables; if those tables are missing, votes still share through the existing `duel_matches` bridge so every phone sees the same tallies.

Hard-refresh after updating — Join and Vote should update the shared counts.

## Duel matchmaking (play real people)

Duel Fishing matches two players through Supabase. If you always get **COM** instead of a real rival, the `duel_matches` table is probably missing.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run the contents of [`supabase/duel_matches.sql`](supabase/duel_matches.sql)
3. Reload the game and start a duel on both devices within ~20 seconds

Both players need a tablet or computer (duel is disabled on phones). Set your initials in the game so rivals see your tag.

### PvP hook + score sync (existing tables)

If you already created `duel_matches`, also run [`supabase/duel_matches_pvp_sync.sql`](supabase/duel_matches_pvp_sync.sql) so rivals can see each other's rod movement and live scores.

## Fisher of the Day (shared daily board)

Fisher of the Day uses the shared Supabase **`leaderboard`** table, filtered to scores posted on the current UTC day — same sync path as Top 10, so every device sees the same standings.

Optional: run [`supabase/daily_leaderboard.sql`](supabase/daily_leaderboard.sql) for a dedicated daily table; the game prefers it when present, otherwise falls back to the shared leaderboard-by-day path.

Set your profile name before playing so your tag appears on the board.
