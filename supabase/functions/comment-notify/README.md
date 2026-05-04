# comment-notify Edge Function

Sends an email notification whenever a new row is inserted into `public.comments`.

## Required secrets

Set these in Supabase project secrets:

- `RESEND_API_KEY`
- `COMMENT_NOTIFY_TO` (your inbox)
- `COMMENT_NOTIFY_FROM` (verified sender in Resend, e.g. `Archive Bot <notify@yourdomain.com>`)
- `COMMENT_REPLY_TO` (optional; where replies should go)
- `WEBHOOK_SECRET` (shared secret used by SQL trigger)

## Deploy

```bash
supabase functions deploy comment-notify
```

## Local test

```bash
supabase functions serve comment-notify --env-file supabase/functions/.env.local
```

Then POST test payload:

```bash
curl -i -X POST http://localhost:54321/functions/v1/comment-notify \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret" \
  -d '{
    "type": "INSERT",
    "table": "comments",
    "record": {
      "id": "00000000-0000-0000-0000-000000000001",
      "alias": "Tester",
      "story": "EF007E",
      "chapter": "Chapter 1",
      "comment": "This chapter wrecked me.",
      "created_at": "2026-05-04T12:00:00.000Z"
    }
  }'
```
