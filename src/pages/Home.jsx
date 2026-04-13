import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";
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
      title="Celestial Archive"
      subtitle="An evolving digital archive of fanworks, original stories, and unstable transmissions."
    >
      <div className="home-page">
        <section className="home-hero-grid">
          <div className="home-hero-card">
            <div className="home-hero-visual">
              <div className="orbit-ring orbit-ring-outer" />
              <div className="orbit-ring orbit-ring-inner" />
              <div className="hero-moon">☾</div>
            </div>

            <div className="home-hero-copy">
              <p className="home-eyebrow">CELESTIAL ARCHIVE</p>
              <h2 className="home-display-title">
                Stories Filed
                <br />
                Among
                <br />
                the Stars
              </h2>
              <p className="home-description">
                A curated library of fanfics, original writing, and immersive
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
            <article className="home-info-card">
              <p className="home-eyebrow">A HAND-BUILT INTERACTIVE EXPERIENCE</p>
              <h3 className="home-card-title">Featured Transmission</h3>
              <p className="home-card-copy">
                Enter a curated archive of stories, signals, and private
                constellations. Each work opens into its own coded world.
              </p>

              <Link to="/fics/ef007e" className="home-button">
                Enter EF007E
              </Link>
            </article>

            <article className="home-info-card">
              <p className="home-eyebrow">NEWEST UPDATE</p>
              <h3 className="home-card-title">Latest Orbit</h3>
              <p className="home-card-copy">
                A new file has been added to the archive. Follow the trail
                through fragments, tags, and hidden interfaces.
              </p>

              <div className="home-button-row">
                <Link to="/fics" className="home-button secondary">
                  Browse Fics
                </Link>
                <Link to="/originals" className="home-button secondary">
                  Browse Originals
                </Link>
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