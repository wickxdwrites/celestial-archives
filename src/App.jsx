import "./App.css";

export default function App() {
  const featured = [
    {
      title: "Featured Transmission",
      subtitle: "A hand-built interactive experience",
      text: "Enter a curated archive of stories, signals, and private constellations. Each work opens into its own coded world.",
    },
    {
      title: "Latest Orbit",
      subtitle: "Newest update",
      text: "A new file has been added to the archive. Follow the trail through fragments, tags, and hidden interfaces.",
    },
  ];

  const cards = [
    {
      title: "Archive Constellations",
      desc: "Browse fanfics by mood, pairing, world, or format.",
      tags: ["Fics", "Tagged", "Searchable"],
    },
    {
      title: "Private Orbits",
      desc: "Explore original works, worlds, and long-form projects.",
      tags: ["Originals", "Series", "Worldbuilding"],
    },
    {
      title: "Signal Log",
      desc: "A quiet place for updates, notes, and small transmissions.",
      tags: ["Updates", "Notes", "Entries"],
    },
  ];

  return (
    <div className="site">
      <div className="overlay">
        <div className="planet planet-a" />
        <div className="planet planet-b" />

        <svg className="constellation constellation-a" width="200" height="120" viewBox="0 0 200 120">
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
            <a href="#">Home</a>
            <span>✦</span>
            <a href="#">Fics</a>
            <span>✦</span>
            <a href="#">Originals</a>
          </nav>

          <div className="nav-emblem">
            <div className="nav-emblem-top">Celestial</div>
            <div className="nav-emblem-icon">☼</div>
          </div>

          <button className="nav-button">Enter Archive</button>
        </header>

        <main className="hero-layout">
          <section className="hero-card">
            <div className="hero-arch-wrap">
              <div className="hero-arch">
                <div className="hero-moon">☾</div>
              </div>
            </div>

            <div className="hero-copy">
              <div className="eyebrow">Celestial Archive</div>
              <h1>
                Stories Filed
                <br />
                Among the Stars
              </h1>
              <p>
                A curated library of fanfics, original writing, and immersive coded experiences.
                Browse by constellation, follow a signal, or step through a doorway into a world built for a single story.
              </p>

              <div className="tag-row">
                <span>Interactive</span>
                <span>Celestial</span>
                <span>Fandom</span>
                <span>Originals</span>
              </div>
            </div>
          </section>

          <aside className="side-panels">
            {featured.map((item) => (
              <section key={item.title} className="info-card">
                <div className="eyebrow small">{item.subtitle}</div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </section>
            ))}
          </aside>
        </main>

        <section className="archive-section">
          <div className="archive-header">
            <div>
              <div className="eyebrow small">Browse the Archive</div>
              <h2>Begin with a Constellation</h2>
            </div>
            <div className="archive-pill">Search and filters will live here</div>
          </div>

          <div className="card-grid">
            {cards.map((card) => (
              <article key={card.title} className="archive-card">
                <div className="card-star">✦</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="tag-row small-tags">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guestbook-section">
          <div className="guestbook-header">
            <div className="eyebrow small">Visitor Signals</div>
            <h2>Leave a Message in the Stars</h2>
            <p>Share your thoughts, reactions, or feelings after exploring the archive.</p>
          </div>

          <div className="guestbook-form-row">
            <input type="text" placeholder="Your name or alias" />
            <input type="text" placeholder="Related story (optional)" />
            <button>Send Signal</button>
          </div>

          <textarea placeholder="Write your message..." rows="4" />

          <div className="signal-grid">
            <div className="signal-card">
              <div className="signal-top">
                <span>lunarEcho</span>
                <span>TRON FILE</span>
              </div>
              <p>this fic actually broke me in the best way possible</p>
            </div>

            <div className="signal-card">
              <div className="signal-top">
                <span>starfall.exe</span>
                <span>INTERACTIVE</span>
              </div>
              <p>the interface??? insane. i felt like i was inside the system</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}