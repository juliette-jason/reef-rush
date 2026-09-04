# reef-rush

## Friend party codes (no sign-in)

Play Duel or Co-op with a friend using an auto-generated code — no accounts.

1. Open [Supabase](https://supabase.com/dashboard) → **SQL Editor**
2. Run [`supabase/duel_matches.sql`](supabase/duel_matches.sql) if you haven’t already
3. Run [`supabase/duel_matches_party_code.sql`](supabase/duel_matches_party_code.sql)
4. Hard-refresh the live game

**Host:** Events → Duel/Co-op → Cast off → **Play with a friend** → share the on-screen code  
**Friend:** Events → **Enter friend code** → Join → pick gear → Cast off

## Fishing Tourney (shared votes + 35 daily spots)

Events → **Fishing Tourney** needs three Supabase tables. Without them, join/vote still work on your device, but spots won't sync across phones/tablets.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run [`supabase/fishing_tournament.sql`](supabase/fishing_tournament.sql)
3. Hard-refresh the live game — Join and Vote should update the shared `X/35` count

## Duel matchmaking (play real people)

Duel Fishing matches two players through Supabase. If you always get **COM** instead of a real rival, the `duel_matches` table is probably missing.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run the contents of [`supabase/duel_matches.sql`](supabase/duel_matches.sql)
3. Reload the game and start a duel on both devices within ~20 seconds

Both players need a tablet or computer (duel is disabled on phones). Set your initials in the game so rivals see your tag.

### PvP hook + score sync (existing tables)

If you already created `duel_matches`, also run [`supabase/duel_matches_pvp_sync.sql`](supabase/duel_matches_pvp_sync.sql) so rivals can see each other's rod movement and live scores.

## Fisher of the Day (shared daily board)

The Events screen **Fisher of the Day** board only shows other players when the `daily_leaderboard` table exists in Supabase. Without it, each device keeps scores locally.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run the contents of [`supabase/daily_leaderboard.sql`](supabase/daily_leaderboard.sql)
3. Reload the game — today's standings refresh from the server when you open Events and after each posted score

Set your initials before playing so your tag appears on the board.
