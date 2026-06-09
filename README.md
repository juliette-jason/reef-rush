# reef-rush

## Duel matchmaking (play real people)

Duel Fishing matches two players through Supabase. If you always get **COM** instead of a real rival, the `duel_matches` table is probably missing.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run the contents of [`supabase/duel_matches.sql`](supabase/duel_matches.sql)
3. Reload the game and start a duel on both devices within ~20 seconds

Both players need a tablet or computer (duel is disabled on phones). Set your initials in the game so rivals see your tag.

### PvP hook + score sync (existing tables)

If you already created `duel_matches`, also run [`supabase/duel_matches_pvp_sync.sql`](supabase/duel_matches_pvp_sync.sql) so rivals can see each other's rod movement and live scores.
