# Campus Resource Hub

A dark, searchable campus knowledge index for links and study notes. It ships with 24 seeded resources, bookmark/vote state per browser, URL-synced filters, import/export-ready local persistence, and an optional Supabase backend.

## Run locally
`npm install` then `npm run dev`. Local mode works with zero environment variables. `npm run build` validates the production bundle; `npm run preview` serves it.

## Supabase
Create a project, run `supabase/schema.sql`, then insert the rows from `src/data/seed.json` (or generate equivalent SQL). Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel for both Production and Preview. The repository uses explicit selects, RLS and RPC functions for ownership-safe edits.

## Deploy
`git init`, `git add .`, `git commit -m "Build campus resource hub"`, push to GitHub, import the repository at vercel.com/new, choose Vite, add environment variables if desired, and deploy. `vercel dev` is needed to test the serverless link checker locally.

Known limitations: bookmarks and votes are per-browser, and ownership is represented by a browser token rather than accounts.
