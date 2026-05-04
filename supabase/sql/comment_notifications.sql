-- Comment email notifications via Supabase Edge Function + pg_net
-- Run this after deploying the `comment-notify` function and setting vault secrets.

-- 1) Enable required extensions
create extension if not exists pg_net;
create extension if not exists pgcrypto;

-- 2) Store secrets in vault (run once; update values as needed)
-- Replace placeholders before executing.
select vault.create_secret('https://<YOUR-PROJECT-REF>.supabase.co/functions/v1/comment-notify', 'comment_notify_url');
select vault.create_secret('<YOUR-WEBHOOK-SECRET>', 'comment_notify_webhook_secret');

-- 3) Trigger function: posts inserted comment rows to edge function
create or replace function public.notify_comment_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  notify_url text;
  webhook_secret text;
begin
  select decrypted_secret into notify_url
  from vault.decrypted_secrets
  where name = 'comment_notify_url'
  order by created_at desc
  limit 1;

  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'comment_notify_webhook_secret'
  order by created_at desc
  limit 1;

  if notify_url is null or webhook_secret is null then
    raise warning 'Comment notification skipped: missing vault secret(s).';
    return new;
  end if;

  perform net.http_post(
    url := notify_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', webhook_secret
    ),
    body := jsonb_build_object(
      'type', TG_OP,
      'schema', TG_TABLE_SCHEMA,
      'table', TG_TABLE_NAME,
      'record', row_to_json(new)
    )
  );

  return new;
end;
$$;

-- 4) Trigger on comments insert

drop trigger if exists comments_notify_insert on public.comments;

create trigger comments_notify_insert
after insert on public.comments
for each row
execute function public.notify_comment_insert();
