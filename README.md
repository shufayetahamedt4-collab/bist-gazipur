# BIST Gazipur — website and management portal

Marketing site and admin console for BGIFT Institute of Science & Technology (BIST), Gazipur.
React 19 + Vite 8 + Tailwind v4, bilingual (English / Bangla) with light and dark themes.

**Data policy:** everything shown is mirrored from <https://bist.edu.bd>. Where the
institute publishes nothing, the UI says so explicitly. Nothing is invented to fill a gap —
no fabricated dates, names, figures or profile sections.

## Run locally

```bash
npm install
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | Typecheck (`tsc --noEmit`) |
| `npm run preview` | Serve the built `dist/` locally |

If `npm run` is unavailable in a restricted shell, the same commands can be invoked
directly:

```bash
node node_modules/typescript/bin/tsc --noEmit        # typecheck
node node_modules/vite/bin/vite.js build             # production build
```

## Environment

Copy `.env.example` to `.env` and fill in the two Supabase values:

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | The **public anon** key |

The anon key is meant to be public — it ships inside the browser bundle. It is only safe
because Row Level Security is on for every table. **Never** put the `service_role` key in a
`VITE_` variable; it bypasses RLS and would be compiled into public JavaScript.

If your local `.env.example` is missing, it is excluded via `.git/info/exclude` in this
checkout, but the required variables are listed above and in `.env.example`.

## Database (Supabase)

Phase 1 schema lives in `supabase/migrations/0001_init.sql`. Apply it either way:

```bash
# CLI (linked project)
supabase db push

# or paste the file into the dashboard SQL editor
```

It is idempotent, enables RLS on all eleven tables, creates the `portraits` and `cvs`
storage buckets, and ends with an assertion that **raises an exception** if any table is
left without RLS.

Then seed the roster:

```bash
node node_modules/tsx/dist/cli.mjs scripts/seed-people.mjs   # writes supabase/seed.sql
# apply supabase/seed.sql the same way as the migration
```

The seed is generated from `src/data/people.ts` and is idempotent (`on conflict … do update`),
so re-running it after refreshing the roster is safe.

### Why 39 people and not 47

The roster is 39 faculty plus 8 administrative officers, but **every officer already appears
in the teaching roster**. The unified model in `src/data/people.ts` stores one row per person
with a variable number of roles, so Prof. Nurul Amin is one person holding two roles
(Vice-Principal as faculty, and Vice-Principal under *Academy, Admin & HR* as an officer).
`person_roles` in the database mirrors that.

`FACULTY_MEMBERS` and `ADMINISTRATIVE_OFFICERS` still exist as **lossless projections** of
`PEOPLE`, so the existing components keep working unchanged. New code should read `PEOPLE`.

## Routing

Navigation is hash-based (`#/library`, `#/programs/fdt`, `#/people/<slug>`), implemented in
`src/router/hashRoute.ts`. Hash routing is used deliberately: the site is published to a
GitHub Pages *project subpath* with `base: './'`, where history routing would need a
`404.html` SPA fallback. Hash routing works on any static host with the deploy workflow
unchanged.

## Deployment

`.github/workflows/deploy.yml` builds `dist/` and publishes it to GitHub Pages on every push
to `main`. Because the site is static, only the anon key is available to the client — all
write access is enforced by the database's RLS policies, not by the UI.
