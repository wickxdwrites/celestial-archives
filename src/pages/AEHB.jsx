import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AEHBChapters from "../data/AEHB";
import { saveComment, getComments, COMMENT_LIMITS } from "../utils/comments";
import { getTheme } from "../themes/registry";
import aehbMeta from "../works/aehb/meta";
import honeyBreadImage from "../assets/honey.png";
import milkBreadImage from "../assets/milk.png";
import lemonPoppySeedBreadImage from "../assets/lemon.png";
import "./AEHB.css";

export default function AEHB() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getValidChapterId = (chapterId) =>
    AEHBChapters.some((chapter) => chapter.id === chapterId)
      ? chapterId
      : AEHBChapters[0].id;
  const [selectedChapterId, setSelectedChapterId] = useState(() =>
    getValidChapterId(searchParams.get("chapter"))
  );
  const [alias, setAlias] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [flameFlicker, setFlameFlicker] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedBreadId, setSelectedBreadId] = useState(null);

  const theme = getTheme("aehb");
  const activeChapter =
    AEHBChapters.find((chapter) => chapter.id === selectedChapterId) || AEHBChapters[0];
  const currentIndex = AEHBChapters.findIndex(ch => ch.id === selectedChapterId);
  const prevChapter = currentIndex > 0 ? AEHBChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < AEHBChapters.length - 1 ? AEHBChapters[currentIndex + 1] : null;

  const breadChoices = [
    { id: "honey", label: "Honey Bread", storyLabel: "honey bread", image: honeyBreadImage },
    { id: "milk", label: "Milk Bread", storyLabel: "milk bread", image: milkBreadImage },
    {
      id: "lemon",
      label: "Lemon Poppy Seed Bread",
      storyLabel: "lemon poppy seed bread",
      image: lemonPoppySeedBreadImage,
    },
  ];

  const selectedBread = breadChoices.find((bread) => bread.id === selectedBreadId) || null;

  const chapterHtml =
    typeof activeChapter.content === "string"
      ? activeChapter.content.replaceAll("{{selectedBread}}", selectedBread?.storyLabel || "")
      : "";

  const hasBreadSelector =
    activeChapter.id === "chapter-12" && chapterHtml.includes("<!-- BREAD_SELECTOR -->");

  const chapterParts = hasBreadSelector
    ? chapterHtml.split("<!-- BREAD_SELECTOR -->")
    : [chapterHtml, ""];

  const updateSelectedChapter = (chapterId, shouldScroll = true) => {
    const validChapterId = getValidChapterId(chapterId);

    setSelectedChapterId(validChapterId);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("chapter", validChapterId);
      return nextParams;
    });

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setSelectedChapterId(getValidChapterId(searchParams.get("chapter")));
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadComments() {
      const scopedComments = await getComments({
        story: aehbMeta.title,
        chapter: activeChapter.label,
      });

      if (isMounted) {
        setComments(scopedComments);
      }
    }

    loadComments();

    return () => {
      isMounted = false;
    };
  }, [activeChapter.label]);

  useEffect(() => {
    if (activeChapter.id === "chapter-12") {
      setSelectedBreadId(null);
    }
  }, [activeChapter.id]);

  // Flame flicker effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlameFlicker(true);
      setTimeout(() => setFlameFlicker(false), 150);
    }, Math.random() * 8000 + 5000); // Random interval 5-13 seconds

    return () => clearInterval(flickerInterval);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedComments = await saveComment({
        alias,
        story: aehbMeta.title,
        chapter: activeChapter.label,
        comment: commentText,
      });

      setAlias("");
      setCommentText("");
      setComments(updatedComments);
      setSubmitError("");
      setSubmitted(true);

      window.setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    } catch (error) {
      setSubmitted(false);
      setSubmitError(error?.message || "Unable to send your raven right now.");
    }
  };

  return (
    <div className={`aehb-reader-page ${theme.classes.page} ${flameFlicker ? 'flame-flicker' : ''}`}>
      {/* Atmospheric overlays */}
      <div className="aehb-parchment-texture" />
      <div className="aehb-candlelight-glow" />
      <div className="aehb-ink-stains" />
      
      <div className="aehb-manuscript-wrapper">
        {/* Left Panel - Mystical Tome Spine with Navigation */}
        <div className="aehb-book-spine">
          <div className="aehb-banner-ember-wrap">
            <div className="aehb-banner-rod" />
            <div className="aehb-spine-title">Ashes to Earth and a Heart to Burn</div>
            {/* Rising ember sparks */}
            {[...Array(18)].map((_, i) => (
              <span key={i} className={`aehb-ember aehb-ember-${i}`} />
            ))}
          </div>
          <div className="aehb-spine-ornament">☽</div>
          
          {/* Floating Chapter Orb Navigation */}
          <div className="aehb-bookmark-tabs">
            {AEHBChapters.map((chapter, index) => (
              <div 
                key={chapter.id}
                className={`aehb-bookmark-tab ${selectedChapterId === chapter.id ? 'active' : ''}`}
                onClick={() => updateSelectedChapter(chapter.id)}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="aehb-bookmark-text">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Main Manuscript Page */}
        <div className="aehb-manuscript-page">
          {/* Enchanted Border */}
          <div className="aehb-page-border"></div>

          {/* Mystical Header */}
          <header className="aehb-manuscript-header">
            <div className="aehb-heraldic-border">
              <div className="aehb-coat-of-arms">
                <img src="/celestial-archives/blue-wax-seal.png" alt="House Crest" className="aehb-crest-img" />
              </div>
              <div className="aehb-manuscript-title">
                <h1 className="aehb-tome-title">Ashes to Earth and a Heart to Burn</h1>
                <div className="aehb-subtitle-scroll">Fire & Blood</div>
              </div>
              <div className="aehb-wax-seal">
                <img src="/celestial-archives/wax-seal.png" alt="House Seal" className="aehb-seal-img" />
              </div>
            </div>
            
            {/* Enchanted Navigation */}
            <nav className="aehb-scroll-nav">
              <div className="aehb-scroll-left">◈</div>
              <div className="aehb-nav-links">
                <Link to="/" className="aehb-scroll-link">The Keep</Link>
                <span className="aehb-nav-dot">•</span>
                <Link to="/fics" className="aehb-scroll-link">Scrolls</Link>
                <span className="aehb-nav-dot">•</span>
                <Link to="/originals" className="aehb-scroll-link">Sagas</Link>
                <span className="aehb-nav-dot">•</span>
                <Link to="/extras" className="aehb-scroll-link">Relics</Link>
              </div>
              <div className="aehb-scroll-right">◈</div>
            </nav>
          </header>

          {/* Enchanted Story Content */}
          <main className="aehb-manuscript-content">
            {/* Chapter Header */}
            <section className="aehb-chapter-header">
              <div className="aehb-chapter-number">Chapter {currentIndex + 1}</div>

              {/* Chapter dropdown selector */}
              <div className="aehb-chapter-select-wrap">
                <select
                  className="aehb-chapter-select"
                  value={selectedChapterId}
                  onChange={(e) => updateSelectedChapter(e.target.value)}
                >
                  {AEHBChapters.map((ch, i) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.label}
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="aehb-chapter-title">{activeChapter.label}</h2>
              {activeChapter.summary && (
                <div className="aehb-chapter-summary">{activeChapter.summary}</div>
              )}
              
              {/* Mystical Tags */}
              <div className="aehb-heraldic-banners">
                <div className="aehb-banner">⚔ Fantasy AU</div>
                <div className="aehb-banner">✦ Mage Porsche</div>
                <div className="aehb-banner">† Angst</div>
                <div className="aehb-banner">♔ Court Intrigue</div>
              </div>
            </section>

            {/* Floating Story Manuscript */}
            <section className="aehb-story-manuscript">
              <div className="aehb-marginalia-left">
                <div className="aehb-vine-decoration">❋</div>
                <div className="aehb-bird-decoration">❧</div>
              </div>
              
              <div className="aehb-text-column">
                <div className="aehb-story-content">
                  {typeof activeChapter.content === "string" ? (
                    hasBreadSelector ? (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: chapterParts[0] }} />

                        <section className="aehb-bread-selector" aria-label="Bread selection for Chapter 12">
                          <p className="aehb-bread-selector-title">Pick the loaf Porsche points at:</p>
                          <div className="aehb-bread-options">
                            {breadChoices.map((bread) => (
                              <button
                                key={bread.id}
                                type="button"
                                className={`aehb-bread-option ${selectedBreadId === bread.id ? "active" : ""}`}
                                onClick={() => setSelectedBreadId(bread.id)}
                              >
                                <img src={bread.image} alt={bread.label} className="aehb-bread-option-image" />
                                <span className="aehb-bread-option-label">{bread.label}</span>
                              </button>
                            ))}
                          </div>
                        </section>

                        {selectedBread ? (
                          <div dangerouslySetInnerHTML={{ __html: chapterParts[1] }} />
                        ) : (
                          <p className="aehb-bread-selector-hint">Choose a bread to continue the chapter.</p>
                        )}
                      </>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: chapterHtml }} />
                    )
                  ) : (
                    activeChapter.content.map((paragraph, index) => (
                      <p key={`${activeChapter.id}-${index}`} className="aehb-manuscript-paragraph">
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </div>

              <div className="aehb-marginalia-right">
                <div className="aehb-dragon-decoration">✠</div>
                <div className="aehb-flower-decoration">❋</div>
              </div>
            </section>

            {/* Prev / Next chapter navigation */}
            <nav className="aehb-chapter-nav">
              {prevChapter ? (
                <button
                  className="aehb-chapter-nav-btn aehb-nav-prev"
                  onClick={() => updateSelectedChapter(prevChapter.id)}
                >
                  <span className="aehb-nav-arrow">◄</span>
                  <span className="aehb-nav-label">{prevChapter.label}</span>
                </button>
              ) : <div />}
              {nextChapter ? (
                <button
                  className="aehb-chapter-nav-btn aehb-nav-next"
                  onClick={() => updateSelectedChapter(nextChapter.id)}
                >
                  <span className="aehb-nav-label">{nextChapter.label}</span>
                  <span className="aehb-nav-arrow">►</span>
                </button>
              ) : <div />}
            </nav>

            {/* Raven's Post — below the fic */}
            <section className="aehb-guestbook">
              <div className="aehb-guestbook-header">
                <h3 className="aehb-guestbook-title">
                  <span className="aehb-quill-icon">✒</span>
                  The Raven's Post
                </h3>
                <div className="aehb-ornamental-line">⚔ ✦ ⚔</div>
              </div>

              <div className="aehb-raven-post-body">
                <form onSubmit={handleSubmit} className="aehb-chronicle-form">
                  <div className="aehb-form-scroll">
                    <div className="aehb-input-group">
                      <label className="aehb-scroll-label" htmlFor="aehb-alias">
                        Your House & Name
                      </label>
                      <input
                        id="aehb-alias"
                        className="aehb-parchment-input"
                        type="text"
                        value={alias}
                        onChange={(event) => {
                          setAlias(event.target.value);
                          setSubmitError("");
                        }}
                        placeholder="Lord, Lady, Ser, Maester..."
                        maxLength={COMMENT_LIMITS.aliasMax}
                      />
                    </div>

                    <div className="aehb-input-group">
                      <label className="aehb-scroll-label" htmlFor="aehb-comment">
                        Your Raven Message
                      </label>
                      <textarea
                        id="aehb-comment"
                        className="aehb-parchment-textarea"
                        value={commentText}
                        onChange={(event) => {
                          setCommentText(event.target.value);
                          setSubmitError("");
                        }}
                        placeholder="Send your words across the realm..."
                        maxLength={COMMENT_LIMITS.commentMax}
                      />
                    </div>

                    <button type="submit" className="aehb-seal-button">
                      <span className="aehb-seal-icon-btn">✦</span>
                      Send the Raven
                    </button>

                    {submitted && (
                      <p style={{ margin: "8px 0 0", color: "#6a4f2f", fontWeight: 600 }}>
                        Raven delivered.
                      </p>
                    )}

                    {submitError && (
                      <p style={{ margin: "8px 0 0", color: "#8f2d2d", fontWeight: 600 }}>
                        {submitError}
                      </p>
                    )}
                  </div>
                </form>

                <div className="aehb-chronicles-display">
                  <h4 className="aehb-chronicles-header">
                    <span className="aehb-tome-icon">❧</span>
                    Ravens Received
                  </h4>
                  <div className="aehb-chronicles-scroll">
                    {comments.map((comment) => (
                      <article key={comment.id} className="aehb-chronicle-entry">
                        <div className="aehb-chronicle-seal">
                          <span className="aehb-seal-icon">◆</span>
                          <strong className="aehb-chronicler-name">{comment.alias}</strong>
                        </div>
                        <p className="aehb-chronicle-text">{comment.comment}</p>
                        <time className="aehb-chronicle-date">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </time>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Bottom burning ember trail */}
      <div className="aehb-bottom-embers">
        {[...Array(24)].map((_, i) => (
          <span key={i} className={`aehb-bottom-ember aehb-bottom-ember-${i}`} />
        ))}
        <div className="aehb-ember-glow-bar" />
      </div>
    </div>
  )
}
