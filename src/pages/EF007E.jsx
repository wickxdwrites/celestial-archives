import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EF007EChapters from "../data/EF007E";
import { saveComment } from "../utils/comments";
import { getTheme } from "../themes/registry";
import "../styles/ef007e-theme.css";

export default function TronFile() {
  const [selectedChapterId, setSelectedChapterId] = useState(EF007EChapters[0].id);
  const [alias, setAlias] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const theme = getTheme("ef007e");

  const activeChapter =
    EF007EChapters.find((chapter) => chapter.id === selectedChapterId) ||
    EF007EChapters[0];
    
  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 10000 + 15000); // Random interval 15-25 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alias.trim() || !commentText.trim()) return;

    saveComment({
      alias: alias.trim(),
      story: "EF007E",
      chapter: activeChapter.label,
      comment: commentText.trim(),
    });

    setAlias("");
    setCommentText("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className={`tron-page ${theme.classes.page} ${glitchActive ? 'tron-glitch-active' : ''}`}>
      <div className="tron-scanlines" />
      <div className="tron-grid-overlay" />

      <div className="tron-shell">
        <header className="tron-topbar">
          <div className="tron-brand" data-text="EF007E">EF007E</div>

          <nav className="tron-nav">
            <Link to="/">HOME</Link>
            <span>•</span>
            <Link to="/fics">FICS</Link>
            <span>•</span>
            <Link to="/originals">ORIGINALS</Link>
            <span>•</span>
            <Link to="/extras">EXTRAS</Link>
          </nav>

          <div className="tron-status">
            <span className="tron-status-indicator"></span>
            FILE READER ONLINE
          </div>
        </header>

        <section className="tron-reader-layout">
          <aside className="tron-reader-sidebar">
            <div className="tron-panel-title">FILE INDEX</div>

            <div className="tron-story-meta">
              <div className="tron-meta-row">
                <span className="tron-meta-label">TITLE</span>
                <span className="tron-meta-value">EF007E</span>
              </div>

              <div className="tron-meta-row">
                <span className="tron-meta-label">STATUS</span>
                <span className="tron-meta-value">ONGOING</span>
              </div>

              <div className="tron-meta-row">
                <span className="tron-meta-label">CURRENT</span>
                <span className="tron-meta-value">
                  {activeChapter.label.replace("Chapter ", "CH. ")}
                </span>
              </div>
            </div>

            <div className="tron-chapter-select-wrap">
              <label className="tron-select-label" htmlFor="tron-chapter-select">
                Select Chapter
              </label>

              <select
                id="tron-chapter-select"
                className="tron-chapter-select"
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
              >
                {EF007EChapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tron-chapter-nav">
              <h4>Chapter Navigation</h4>
              {EF007EChapters.map((chapter) => (
                <button
                  key={chapter.id}
                  className={selectedChapterId === chapter.id ? 'active' : ''}
                  onClick={() => setSelectedChapterId(chapter.id)}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          </aside>

          <main className="tron-reader-main">
            <section className="tron-story-header">
              <div className="tron-eyebrow">ARCHIVE ENTRY 001</div>
              <h1 className="tron-story-title">{activeChapter.label}</h1>
              <p className="tron-story-subtitle">{activeChapter.summary}</p>

              <div className="tron-tags">
                <span>TRON</span>
                <span>SCI-FI</span>
                <span>ANGST</span>
                <span>INTERACTIVE POTENTIAL</span>
              </div>
            </section>

            <section className="tron-reading-panel">
              <div className="tron-panel-title">CHAPTER FILE</div>

              <div className="tron-chapter-content">
                {typeof activeChapter.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: activeChapter.content }} />
                ) : (
                  activeChapter.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                )}
              </div>

              <div className="tron-callout">
                <div className="tron-callout-title">SYSTEM NOTE</div>
                <p>
                  This space can hold in-universe notes, corrupted inserts,
                  faux-terminal interruptions, or file fragments later.
                </p>
              </div>
            </section>

            <section className="tron-reader-footer">
              <button
                className="tron-secondary"
                onClick={() => {
                  const currentIndex = EF007EChapters.findIndex(
                    (chapter) => chapter.id === selectedChapterId
                  );
                  if (currentIndex > 0) {
                    setSelectedChapterId(EF007EChapters[currentIndex - 1].id);
                  }
                }}
              >
                PREVIOUS CHAPTER
              </button>

              <button
                className="tron-primary"
                onClick={() => {
                  const currentIndex = EF007EChapters.findIndex(
                    (chapter) => chapter.id === selectedChapterId
                  );
                  if (currentIndex < EF007EChapters.length - 1) {
                    setSelectedChapterId(EF007EChapters[currentIndex + 1].id);
                  }
                }}
              >
                NEXT CHAPTER
              </button>
            </section>

            <section className="tron-comment-panel">
              <div className="tron-panel-title">LEAVE A SIGNAL</div>

              <form className="tron-comment-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />

                <textarea
                  rows="4"
                  placeholder="Leave your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />

                <button type="submit" className="tron-primary">
                  SUBMIT SIGNAL
                </button>
              </form>

              {submitted && (
                <div className="tron-comment-success">
                  Signal recorded. It should now appear on the homepage.
                </div>
              )}
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}