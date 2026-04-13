import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";

const originalEntries = [
  {
    id: "celestial-fragments",
    title: "Celestial Fragments",
    status: "Planned",
    format: "Original Story",
    summary:
      "A placeholder collection for original fiction, worldbuilding records, and future archive expansions.",
    path: "/originals",
    tags: ["Original", "Sci-Fi", "Archive"],
  },
  {
    id: "future-original",
    title: "Future Original Slot",
    status: "Drafting",
    format: "Concept Entry",
    summary:
      "Reserved space for a future original work entry within the Celestial Archive.",
    path: "/originals",
    tags: ["Placeholder"],
  },
];

export default function Originals() {
  return (
    <ArchiveLayout
      themeId="celestial"
      title="Originals"
      subtitle="Independent works, concepts, fragments, and future records preserved under the Celestial Archive."
    >
      <section className="archive-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">ORIGINAL INDEX</p>
            <h2 className="section-title">Stored original entries</h2>
          </div>
        </div>

        <div className="archive-card-grid">
          {originalEntries.map((entry) => (
            <article key={entry.id} className="archive-entry-card card-accent-celestial">
              <div className="entry-meta-row">
                <span className="entry-type">{entry.format}</span>
                <span className="entry-status">{entry.status}</span>
              </div>

              <h3 className="entry-title">{entry.title}</h3>
              <p className="entry-summary">{entry.summary}</p>

              <div className="tag-row">
                {entry.tags.map((tag) => (
                  <span key={tag} className="archive-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={entry.path} className="entry-link">
                View Entry
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ArchiveLayout>
  );
}