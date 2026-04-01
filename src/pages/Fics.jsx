import { Link } from "react-router-dom";

export default function Fics() {
  const fics = [
    {
      title: "TRON FILE",
      fandom: "TRON",
      description:
        "A corrupted system narrative of grief, control, and fragmented memory told through interactive terminals and unstable signals.",
      tags: ["Interactive", "Angst", "Sci-Fi"],
      status: "Ongoing",
      chapter: "Chapter 1",
    },
  ];

  return (
    <div className="site">
      <div className="overlay">
        <div className="planet planet-a" />
        <div className="planet planet-b" />

        <svg
          className="constellation constellation-a"
          width="200"
          height="120"
          viewBox="0 0 200 120"
        >
          <line x1="10" y1="20" x2="80" y2="60" />
          <line x1="80" y1="60" x2="140" y2="30" />
          <line x1="140" y1="30" x2="180" y2="90" />
          <circle cx="10" cy="20" r="2" />
          <circle cx="80" cy="60" r="2" />
          <circle cx="140" cy="30" r="2" />
          <circle cx="180" cy="90" r="2" />
        </svg>

        <div className="symbol symbol-a">☾</div>
        <div className="symbol symbol-b">✦</div>
      </div>

      <div className="page">
        <header className="nav">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <span>✦</span>
            <Link to="/fics">Fics</Link>
            <span>✦</span>
            <Link to="/originals">Originals</Link>
          </nav>

          <div className="nav-emblem">
            <div className="nav-emblem-top">Celestial</div>
            <div className="nav-emblem-icon">☼</div>
          </div>

          <Link to="/fics" className="nav-button">
            Enter Archive
          </Link>
        </header>

        <section className="fics-shell">
          <div className="fics-header-row">
            <div>
              <div className="eyebrow small">Archive Constellations</div>
              <h1 className="fics-title">Fics</h1>

              <div className="tag-row small-tags">
                <span>1 Active Transmission</span>
              </div>

              <p className="fics-subtitle">
                A curated archive of active transmissions. Each file opens into
                its own coded experience.
              </p>
            </div>

            <div className="fics-search-pill">Search and filters</div>
          </div>

          <div className="fics-controls">
            <input
              className="fics-search"
              placeholder="Search by title, tag, fandom, or mood"
            />

            <div className="fics-filter-row">
              {["All", "Interactive", "Sci-Fi", "Angst", "Ongoing"].map(
                (tag, i) => (
                  <button
                    key={tag}
                    className={`filter-chip${i === 0 ? " active" : ""}`}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="fics-grid">
            {fics.map((fic) => (
              <article key={fic.title} className="fic-card">
                <div className="fic-card-top">
                  <span className="fic-fandom">{fic.fandom}</span>
                  <div className="fic-meta-right">
                    <span className="fic-status">{fic.status}</span>
                    <span className="fic-chapter">{fic.chapter}</span>
                  </div>
                </div>

                <h2>{fic.title}</h2>

                <div className="fic-description-box">
                  <p>{fic.description}</p>
                </div>

                <div className="tag-row small-tags">
                  {fic.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="fic-actions">
                  <button className="fic-open">Open File</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}