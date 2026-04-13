import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";

const ficEntries = [
  {
    id: "ef007e",
    title: "EF007E",
    status: "Ongoing",
    chapters: "Available",
    summary:
      "A corrupted terminal narrative threaded through memory loss, system instability, and interactive reader commentary.",
    path: "/fics/ef007e",
    isThemed: true,
    tags: ["Sci-Fi", "Interactive", "Corruption", "Terminal"],
  },
  {
    id: "future-fic",
    title: "Future Fic Slot",
    status: "Planned",
    chapters: "0 Chapters",
    summary:
      "Reserved archive space for an upcoming fanwork entry.",
    path: "/fics",
    isThemed: false,
    tags: ["Placeholder"],
  },
];

export default function Fics() {
  return (
    <ArchiveLayout
      themeId="celestial"
      title="Fics"
      subtitle="Catalogued fanworks stored inside the archive. Some remain standard entries. Others operate as themed experiences."
    >
      <section className="archive-section">
        <div className="section-heading-row">
          <div>
            <p className="section-label">FANWORK INDEX</p>
            <h2 className="section-title">Available fic entries</h2>
          </div>
        </div>

        <div className="archive-list">
          {ficEntries.map((fic) => (
            <article key={fic.id} className="archive-list-card">
              <div className="archive-list-main">
                <div className="entry-meta-row">
                  <span className="entry-type">Fic</span>
                  <span className="entry-status">{fic.status}</span>
                </div>

                <h3 className="entry-title">{fic.title}</h3>
                <p className="entry-summary">{fic.summary}</p>

                <div className="tag-row">
                  {fic.tags.map((tag) => (
                    <span key={tag} className="archive-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="archive-list-side">
                <div className="side-detail">
                  <span className="side-label">Chapters</span>
                  <span className="side-value">{fic.chapters}</span>
                </div>

                <div className="side-detail">
                  <span className="side-label">Theme</span>
                  <span className="side-value">
                    {fic.isThemed ? "Custom" : "Celestial"}
                  </span>
                </div>

                <Link to={fic.path} className="entry-link">
                  Open Entry
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ArchiveLayout>
  );
}