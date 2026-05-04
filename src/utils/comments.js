import { supabase } from "../lib/supabaseClient";

const STORAGE_KEY = "celestial_archive_comments";
const RATE_LIMIT_STORAGE_KEY = "celestial_archive_comment_rate_limit";
const COMMENTS_TABLE = "comments";

export const COMMENT_LIMITS = {
  aliasMax: 32,
  commentMax: 800,
  cooldownMs: 30000,
};

const BLOCKED_TERMS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "slut",
  "whore",
  "cunt",
  "nigger",
  "faggot",
  "retard",
  "kys",
];

function getStoredComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function filterByScope(comments, { story, chapter } = {}) {
  return comments.filter((comment) => {
    if (story && comment.story !== story) return false;
    if (chapter && comment.chapter !== chapter) return false;
    return true;
  });
}

function sortByNewest(comments) {
  return [...comments].sort((a, b) => {
    const aDate = new Date(a.createdAt || 0).getTime();
    const bDate = new Date(b.createdAt || 0).getTime();
    return bDate - aDate;
  });
}

function makeCommentId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeInput(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForFilter(value) {
  return normalizeInput(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");
}

function containsBlockedTerms(text) {
  const normalized = normalizeForFilter(text);
  return BLOCKED_TERMS.some((term) => normalized.includes(term));
}

function buildScopeKey({ story, chapter }) {
  return `${story || "global"}::${chapter || "all"}`;
}

function getRateLimitMap() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setRateLimit(scope) {
  try {
    const map = getRateLimitMap();
    map[buildScopeKey(scope)] = Date.now();
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

function validateCommentPayload(payload) {
  if (!payload.alias) {
    throw new Error("Please enter an alias before submitting.");
  }

  if (!payload.comment) {
    throw new Error("Please write a comment before submitting.");
  }

  if (payload.alias.length > COMMENT_LIMITS.aliasMax) {
    throw new Error(`Alias must be ${COMMENT_LIMITS.aliasMax} characters or less.`);
  }

  if (payload.comment.length > COMMENT_LIMITS.commentMax) {
    throw new Error(`Comment must be ${COMMENT_LIMITS.commentMax} characters or less.`);
  }

  if (containsBlockedTerms(payload.alias) || containsBlockedTerms(payload.comment)) {
    throw new Error("Please keep comments respectful and avoid profanity.");
  }

  const scopeKey = buildScopeKey(payload);
  const map = getRateLimitMap();
  const lastSubmittedAt = Number(map[scopeKey] || 0);
  const remainingMs = COMMENT_LIMITS.cooldownMs - (Date.now() - lastSubmittedAt);

  if (remainingMs > 0) {
    const seconds = Math.ceil(remainingMs / 1000);
    throw new Error(`You're commenting too quickly. Try again in ${seconds}s.`);
  }
}

export async function getComments(scope = {}) {
  if (supabase) {
    try {
      let query = supabase
        .from(COMMENTS_TABLE)
        .select("id, alias, story, chapter, comment, created_at")
        .order("created_at", { ascending: false });

      if (scope.story) query = query.eq("story", scope.story);
      if (scope.chapter) query = query.eq("chapter", scope.chapter);

      const { data, error } = await query;
      if (!error) {
        return (data || []).map((row) => ({
          id: row.id,
          alias: row.alias,
          story: row.story,
          chapter: row.chapter,
          comment: row.comment,
          createdAt: row.created_at,
        }));
      }
      console.warn("Supabase getComments failed, using local fallback.", error);
    } catch (error) {
      console.warn("Supabase getComments failed, using local fallback.", error);
    }
  }

  return sortByNewest(filterByScope(getStoredComments(), scope));
}

export async function saveComment(comment) {
  const payload = {
    alias: normalizeInput(comment.alias),
    story: normalizeInput(comment.story),
    chapter: normalizeInput(comment.chapter),
    comment: normalizeInput(comment.comment),
  };

  validateCommentPayload(payload);

  if (supabase) {
    try {
      const { error } = await supabase.from(COMMENTS_TABLE).insert(payload);
      if (!error) {
        setRateLimit(payload);
        return getComments({ story: payload.story, chapter: payload.chapter });
      }
      console.warn("Supabase saveComment failed, using local fallback.", error);
    } catch (error) {
      console.warn("Supabase saveComment failed, using local fallback.", error);
    }
  }

  const existing = getStoredComments();
  const newComment = {
    id: makeCommentId(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  const updated = [newComment, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}

  setRateLimit(payload);

  return sortByNewest(filterByScope(updated, { story: payload.story, chapter: payload.chapter }));
}