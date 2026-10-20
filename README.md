# Campus Resource Hub

Campus Resource Hub is a focused knowledge index for students. It keeps useful links and compact study notes organized by semester, subject, and tags so resources remain easy to find after they disappear into chats or cloud folders.

## Live Demo

[Open Campus Resource Hub](https://campus-resource-hub-chbm.vercel.app/)

The project is intentionally not a file-sharing system: it stores links and text notes only. It works immediately in local mode and can optionally connect to Supabase as a shared backend.

## Product features

- Browse resources by semester and subject from the sidebar.
- Search titles, notes, URLs, subjects, and tags.
- Combine search, semester, subject, tag, and broken-link filters.
- Sort by newest, oldest, title, or upvotes.
- Add either a link or a note through the resource modal.
- Validate required fields and HTTP/HTTPS URLs before saving.
- Edit and delete resources created in the current browser.
- Bookmark resources locally for quick return visits.
- Upvote resources once per browser, with the ability to remove a vote.
- Keep filters in the URL so filtered views can be shared or refreshed.
- Use keyboard shortcuts: `/` focuses search and `N` opens the add-resource modal.
- Responsive layout for desktop, tablet, and mobile screens.
- Optional Vercel serverless endpoint for checking external link status.
- Error-tolerant local fallback when Supabase is unavailable.

## Technology stack

- JavaScript ES modules
- React 18.3.1
- Vite 5.4.8
- Tailwind CSS 3.4.10 with PostCSS and Autoprefixer
- Lucide React icons
- Supabase JavaScript client 2.45.4
- Vercel serverless function for link checking
- Node.js 22.x

The project deliberately avoids TypeScript, React Router, state-management libraries, UI component libraries, and ESLint.

## Project structure

```text
.
├── api/check-link.js
├── src/data/seed.json
├── src/lib/repository.js
├── src/lib/supabase.js
├── src/lib/validators.js
├── src/App.jsx
├── src/index.css
├── src/main.jsx
├── supabase/schema.sql
├── supabase/seed.sql
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── .env.example
```

## Architecture

The frontend is a Vite single-page application. Filters are stored in the query string with `history.replaceState`, so no router or Vercel rewrite configuration is needed.

All persistence is isolated in `src/lib/repository.js`.

### Local mode

Local mode is used when Supabase environment variables are missing. The first load is initialized from `src/data/seed.json`; later changes are stored under the `crh:v1` localStorage key.

If localStorage is missing, malformed, or contains the wrong shape, the repository resets to seed data instead of crashing. Bookmarks, voted resource IDs, created resource IDs, and the browser owner token are stored separately.

### Supabase mode

Supabase mode activates only when both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are non-empty at build time.

The repository follows the security model in `supabase/schema.sql`:

- Reads use an explicit column list; `select('*')` is avoided.
- Inserts include a browser-generated owner token.
- Editing and deleting use RPC functions.
- Upvotes use `increment_upvote`.
- Link status changes use `set_link_status`.
- Seed rows are read-only because their IDs are not locally created.

If a Supabase request fails, the session switches to local mode and continues working.

## Local setup

Requirements: Node.js 22.x and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/`. If localhost is unavailable, use `http://127.0.0.1:5173/`.

Production commands:

```bash
npm run build
npm run preview
```

The app is fully usable without an `.env` file.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql`.
4. Copy the project URL and anon public key.
5. Create `.env.local` from `.env.example`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

6. Restart Vite after changing environment variables.

Vite embeds `VITE_` variables at build time, so changing them after deployment requires a new build.

## Link checker API

`api/check-link.js` accepts only POST requests with:

```json
{"url":"https://example.com"}
```

It allows only HTTP/HTTPS URLs, blocks private network ranges, uses a six-second timeout, retries HEAD failures with GET, and returns `ok`, `broken`, or `unreachable`.

Use `vercel dev` to test the function locally. Plain Vite serves the frontend but does not emulate serverless functions.

## Deployment to Vercel

```bash
git init
git add .
git commit -m "Build campus resource hub"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

Then import the repository at [vercel.com/new](https://vercel.com/new), use the Vite preset, keep `npm run build` and `dist`, select Node 22, and add the Supabase variables for both Production and Preview if shared storage is desired.

## Verification checklist

### Local mode

- Confirm the footer displays `Local mode`.
- Confirm seeded resources persist after refresh.
- Test search, semester, subject, tags, sorting, bookmarks, votes, add, edit, and delete.
- Refresh a filtered URL and confirm filters remain active.
- Test invalid URLs and empty required fields.
- Close the modal with Escape, outside click, and Cancel.
- Test the layout at mobile width.

### Supabase mode

- Confirm the footer displays `Synced · Supabase`.
- Confirm rows load from `resources`.
- Add a resource and confirm its owner token is stored.
- Confirm only browser-created resources show edit/delete actions.
- Confirm upvotes use the RPC function.
- Disconnect Supabase and confirm local fallback.

### Production

```bash
npm install
npm run build
npm run preview
```

## Known limitations

- There are no user accounts or authentication flows.
- Ownership is based on a browser token, not an identity provider account.
- Bookmarks and votes are per-browser and are not shared between devices.
- The link checker requires Vercel or `vercel dev`.
- Some external sites block automated checks or require authentication.
- `src/data/seed.json` is the canonical full local seed set; `supabase/seed.sql` contains the curated SQL demo rows.

