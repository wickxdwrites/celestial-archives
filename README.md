# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Shared Comments Setup (Supabase)

Comments now support shared storage via Supabase.

1. Copy `.env.example` to `.env`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Create a `comments` table in Supabase using this SQL:

```sql
create table if not exists public.comments (
	id uuid primary key default gen_random_uuid(),
	alias text not null,
	story text not null,
	chapter text not null,
	comment text not null,
	created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "Allow read comments"
on public.comments
for select
to anon
using (true);

create policy "Allow insert comments"
on public.comments
for insert
to anon
with check (true);
```

If Supabase env vars are not set, the app automatically falls back to browser localStorage.

## Comment Email Notifications (Long-Term Setup)

The recommended long-term architecture is:

1. Comment inserted into `public.comments`
2. Postgres trigger fires
3. Trigger calls Supabase Edge Function
4. Edge Function sends email through Resend

Files added for this flow:

- `supabase/functions/comment-notify/index.ts`
- `supabase/functions/comment-notify/README.md`
- `supabase/functions/.env.local.example`
- `supabase/sql/comment_notifications.sql`

### Deploy steps

1. Set Supabase function secrets:

```bash
supabase secrets set RESEND_API_KEY=... COMMENT_NOTIFY_TO=... COMMENT_NOTIFY_FROM=... WEBHOOK_SECRET=...
```

2. Deploy edge function:

```bash
supabase functions deploy comment-notify
```

3. Run SQL in `supabase/sql/comment_notifications.sql` after replacing placeholders:

- `YOUR-PROJECT-REF`
- `YOUR-WEBHOOK-SECRET`

After this, every new comment insert sends an email notification.
