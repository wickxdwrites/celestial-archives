const STORAGE_KEY = "celestial_archive_comments";

export function getComments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveComment(comment) {
  const existing = getComments();

  const newComment = {
    id: crypto.randomUUID(),
    ...comment,
    createdAt: new Date().toISOString(),
  };

  const updated = [newComment, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
}