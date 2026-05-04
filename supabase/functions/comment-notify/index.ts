import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type CommentRecord = {
  id: string;
  alias: string;
  story: string;
  chapter: string;
  comment: string;
  created_at?: string;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: CommentRecord;
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

serve(async (req) => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!webhookSecret) {
    return json(500, { error: "Missing WEBHOOK_SECRET" });
  }

  const providedSecret = req.headers.get("x-webhook-secret");
  if (providedSecret !== webhookSecret) {
    return json(401, { error: "Unauthorized webhook" });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyTo = Deno.env.get("COMMENT_NOTIFY_TO");
  const notifyFrom = Deno.env.get("COMMENT_NOTIFY_FROM");
  const replyTo = Deno.env.get("COMMENT_REPLY_TO");

  if (!resendApiKey || !notifyTo || !notifyFrom) {
    return json(500, {
      error:
        "Missing one or more required env vars: RESEND_API_KEY, COMMENT_NOTIFY_TO, COMMENT_NOTIFY_FROM",
    });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return json(400, { error: "Invalid JSON payload" });
  }

  const record = payload.record;
  if (!record) {
    return json(400, { error: "Missing record in payload" });
  }

  const createdAt = record.created_at
    ? new Date(record.created_at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown";

  const subject = `New Comment: ${record.story} - ${record.chapter}`;
  const safeComment = escapeHtml(record.comment);
  const safeAlias = escapeHtml(record.alias);
  const safeStory = escapeHtml(record.story);
  const safeChapter = escapeHtml(record.chapter);

  const html = `
    <h2>New Comment Received</h2>
    <p><strong>Story:</strong> ${safeStory}</p>
    <p><strong>Chapter:</strong> ${safeChapter}</p>
    <p><strong>Alias:</strong> ${safeAlias}</p>
    <p><strong>Submitted:</strong> ${createdAt}</p>
    <hr />
    <p><strong>Comment:</strong></p>
    <blockquote style="margin:0;padding:12px;border-left:4px solid #ddd;background:#fafafa;">
      ${safeComment}
    </blockquote>
  `;

  const emailPayload = {
    from: notifyFrom,
    to: [notifyTo],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  };

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return json(502, {
      error: "Failed to send email via Resend",
      details: errorText,
    });
  }

  return json(200, {
    ok: true,
    message: "Notification email sent",
  });
});
