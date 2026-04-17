import { Link } from "react-router-dom";
import { useState } from "react";
import AEHBChapters from "../data/AEHB";
import { saveComment } from "../utils/comments";
import { getTheme } from "../themes/registry";
import aehbMeta from "../works/aehb/meta";
import "./AEHB.css";

export default function AEHB() {
  const [selectedChapterId, setSelectedChapterId] = useState(AEHBChapters[0].id);
  const [alias, setAlias] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const theme = getTheme("aehb");
  const activeChapter =
    AEHBChapters.find((chapter) => chapter.id === selectedChapterId) || AEHBChapters[0];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!alias.trim() || !commentText.trim()) return;

    saveComment({
      alias: alias.trim(),
      story: aehbMeta.title,
      chapter: activeChapter.label,
      comment: commentText.trim(),
    });

    setAlias("");
    setCommentText("");
    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className={`aehb-reader-page ${theme.classes.page}`}>
      <div className="aehb-shell">
        <header className="aehb-topbar">
          <div className="aehb-brand">AEHB</div>

          <nav className="aehb-nav">
            <Link to="/" className="aehb-nav-link">Home</Link>
            <Link to="/fics" className="aehb-nav-link">Fics</Link>
            <Link to="/originals" className="aehb-nav-link">Originals</Link>
            <Link to="/extras" className="aehb-nav-link">Extras</Link>
          </nav>

          <div className="aehb-status">
            <span className="aehb-status-dot" /> Chronicle Open
          </div>
        </header>

        <section className="aehb-reader-layout">
          <aside className="aehb-sidebar">
            <span className="aehb-panel-title">Chronicle Index</span>

            <div className="aehb-story-meta">
              <div className="aehb-meta-row">
                <span className="aehb-meta-label">Title</span>
                <span className="aehb-meta-value">AEHB</span>
              </div>
              <div className="aehb-meta-row">
                <span className="aehb-meta-label">Status</span>
                <span className="aehb-meta-value">Ongoing</span>
              </div>
              <div className="aehb-meta-row">
                <span className="aehb-meta-label">Current</span>
                <span className="aehb-meta-value">{activeChapter.label}</span>
              </div>
              <div className="aehb-meta-row">
                <span className="aehb-meta-label">Realm</span>
                <span className="aehb-meta-value">{aehbMeta.fandom}</span>
              </div>
            </div>

            <div className="aehb-chapter-select-wrap">
              <label className="aehb-select-label" htmlFor="aehb-chapter-select">
                Select Chapter
              </label>
              <select
                id="aehb-chapter-select"
                className="aehb-chapter-select"
                value={selectedChapterId}
                onChange={(event) => setSelectedChapterId(event.target.value)}
              >
                {AEHBChapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="aehb-chapter-nav">
              <h4 className="aehb-chapter-nav-title">Chapter Navigation</h4>
              {AEHBChapters.map((chapter) => (
                <button
                  key={chapter.id}
                  type="button"
                  className={`aehb-nav-button ${selectedChapterId === chapter.id ? "active" : ""}`}
                  onClick={() => setSelectedChapterId(chapter.id)}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="aehb-main">
            <section className="aehb-story-header">
              <div className="aehb-eyebrow">Illuminated Chronicle</div>
              <h1 className="aehb-story-title">{activeChapter.label}</h1>
              {activeChapter.summary && (
                <p className="aehb-story-subtitle">{activeChapter.summary}</p>
              )}

              <div className="aehb-tags">
                <span className="aehb-tag">Fantasy AU</span>
                <span className="aehb-tag">Mage Porsche</span>
                <span className="aehb-tag">Angst</span>
                <span className="aehb-tag">Court Intrigue</span>
              </div>
            </section>

            <section className="aehb-reading-panel">
              <div className="aehb-panel-title">Chapter Folio</div>
              <div className="aehb-story-content">
                {typeof activeChapter.content === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: activeChapter.content }} />
                ) : (
                  activeChapter.content.map((paragraph, index) => (
                    <p key={`${activeChapter.id}-${index}`}>{paragraph}</p>
                  ))
                )}
              </div>
            </section>

            <section className="aehb-comment-panel">
              <div className="aehb-panel-title">Leave a Margin Note</div>
              <form onSubmit={handleSubmit}>
                <div className="aehb-field-grid">
                  <div>
                    <label className="aehb-field-label" htmlFor="aehb-alias">Name or Alias</label>
                    <input
                      id="aehb-alias"
                      className="aehb-input"
                      type="text"
                      value={alias}
                      onChange={(event) => setAlias(event.target.value)}
                      placeholder="Court name, traveler, witness..."
                    />
                  </div>

                  <div>
                    <label className="aehb-field-label" htmlFor="aehb-comment">Commentary</label>
                    <textarea
                      id="aehb-comment"
                      className="aehb-textarea"
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                      placeholder="Leave your note for this chapter..."
                    />
                  </div>
                </div>

                <button type="submit" className="aehb-submit">
                  Seal Comment
                </button>

                {submitted && (
                  <div className="aehb-submitted">Your note has been entered into the archive.</div>
                )}
              </form>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}