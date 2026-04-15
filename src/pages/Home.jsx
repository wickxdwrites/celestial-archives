import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";
import CelestialMap from "../components/home/CelestialMap";
import "./Home.css";

const recentSignals = [
  {
    title: "EF007E",
    type: "Featured Transmission",
    description:
      "A corrupted signal buried in the archive. Terminal decay, unstable memory, and a story with its own coded interface.",
    path: "/fics/ef007e",
  },
  {
    title: "Fics Archive",
    type: "Collection",
    description:
      "Browse fanworks catalogued through the archive, including themed reading experiences and standard celestial entries.",
    path: "/fics",
  },
  {
    title: "Originals Archive",
    type: "Collection",
    description:
      "Explore original stories, unfinished fragments, concepts, and future archive entries stored under the celestial system.",
    path: "/originals",
  },
];

export default function Home() {
  return (
    <ArchiveLayout
      themeId="celestial"
    >
      <div className="home-page">
        <section className="home-hero-grid">
          <div className="home-hero-card">
            <div className="home-hero-visual">
              <CelestialMap />
            </div>

            <div className="home-hero-copy">
              <p className="home-eyebrow">WELCOME TO MY</p>
              <h1 className="home-main-title">Celestial Archive</h1>
              <h2 className="home-display-title">
                Stories Filed
                <br />
                Among the Stars
              </h2>
              <p className="home-description">
                A personal collection of fanfics, original writing, and immersive
                coded experiences. Browse by constellation, follow a signal, or
                step through a doorway into a world built for a single story.
              </p>

              <div className="home-tag-row">
                <span className="home-tag">INTERACTIVE</span>
                <span className="home-tag">CELESTIAL</span>
                <span className="home-tag">FANDOM</span>
                <span className="home-tag">ORIGINALS</span>
              </div>
            </div>
          </div>

          <div className="home-side-column">
            <article className="home-info-card home-info-card--tall">
              <p className="home-eyebrow">LATEST ORBIT</p>
              <h3 className="home-card-title">Archive Notes</h3>

              <div className="home-update-stack">
                <p className="home-card-copy">
                  Welcome to the archive. This space is reserved for writing
                  updates, author notes, project progress, and whatever else is
                  currently orbiting my mind.
                </p>

                <div className="home-update-entry">
                  <p className="home-update-label">CURRENT SIGNAL</p>
                  <p className="home-update-text">
                    EF007E is the current featured work in progress. More archive
                    entries and custom themed pages will be added over time.
                  </p>
                </div>

                <div className="home-update-entry">
                  <p className="home-update-label">AUTHOR NOTE</p>
                  <p className="home-update-text">
                    This archive is still under construction, but the goal is to
                    create a home where each story can either live under the
                    celestial theme or grow into a world with its own interface.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="home-section-card">
          <div className="home-section-header centered">
            <p className="home-eyebrow">RECENT SIGNALS</p>
            <h2 className="home-section-title">Voices Across the Archive</h2>
            <p className="home-section-copy">
              Recent featured entries and key paths through the archive.
            </p>
          </div>

          <div className="home-signal-grid">
            {recentSignals.map((signal) => (
              <article key={signal.title} className="home-signal-card">
                <p className="home-signal-type">{signal.type}</p>
                <h3 className="home-signal-title">{signal.title}</h3>
                <p className="home-signal-copy">{signal.description}</p>
                <Link to={signal.path} className="home-text-link">
                  Open Entry
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </ArchiveLayout>
  );
}