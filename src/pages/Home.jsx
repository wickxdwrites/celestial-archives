import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";
import CelestialMap from "../components/home/CelestialMap";
import archiveUpdates, { formatUpdateDate, getLastUpdateDate } from "../data/archiveUpdates";
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
              <p className="home-eyebrow">WELCOME TO</p>
              <h1 className="home-main-title">Wickxd's Archive</h1>
              <h2 className="home-display-title">
                My Stories Filed
                <br />
                Among the Stars
              </h2>
              <p className="home-description">
                Click on one of the the stars to the left to browse published fics or original stories, or explore the rest of the archive to find bonus content, updates, 
                and future entries in the works.
              </p>

              <div className="home-tag-row">
                <span className="home-tag">FANFICS</span>
                <span className="home-tag">ORIGINAL WORKS</span>
                <span className="home-tag">GAMES</span>
                <span className="home-tag">EXTRAS</span>
              </div>
            </div>
          </div>

          <div className="home-side-column">
            <article className="home-info-card home-info-card--tall">
              <div className="home-archive-header">
                <p className="home-eyebrow">LATEST ORBIT</p>
                <h3 className="home-card-title">Archive Notes</h3>
                {getLastUpdateDate() && (
                  <div className="home-last-updated">
                    <span className="home-last-updated-label">LAST UPDATED</span>
                    <span className="home-last-updated-date">
                      {formatUpdateDate(getLastUpdateDate().date)} • {getLastUpdateDate().timestamp}
                    </span>
                  </div>
                )}
              </div>

              <div className="home-update-stack">
                <p className="home-card-copy">
                  Welcome to the archive. This is the place where you will see my works in progress or
                  my inner thoughts on the archive itself. I will post updates here as I continue to build out the site and add new content.
                </p>

                {archiveUpdates.map((update) => (
                  <div key={update.id} className="home-update-entry">
                    <div className="home-update-header">
                      <p className="home-update-label">{update.label}</p>
                      <span className="home-update-timestamp">
                        {formatUpdateDate(update.date)}
                      </span>
                    </div>
                    <p className="home-update-text">
                      {update.text}
                    </p>
                  </div>
                ))}
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