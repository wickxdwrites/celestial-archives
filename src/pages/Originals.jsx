import { Link } from "react-router-dom";

export default function Originals() {
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
              <div className="eyebrow small">Private Constellations</div>
              <h1 className="fics-title">Originals</h1>

              <p className="fics-subtitle">
                A private archive of original worlds, long-form works, and coded
                narratives. Each file exists within its own system.
              </p>
            </div>
          </div>

          {/* EMPTY STATE */}
          <div className="originals-empty">
            <div className="originals-empty-inner">
              <div className="originals-symbol">✦</div>

              <h2>No Active Files</h2>

              <p>
                This archive is currently dormant. New transmissions will appear
                here when they are ready to be accessed.
              </p>

              <div className="tag-row small-tags">
                <span>Archive Pending</span>
                <span>Signal Incomplete</span>
                <span>Transmission Locked</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}