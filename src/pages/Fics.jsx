import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import ArchiveLayout from "../components/layout/ArchiveLayout";
import "./Fics.css";

const ficEntries = [
  {
    id: "ef007e",
    title: "EF007E",
    status: "Ongoing",
    chapters: 4,
    totalChapters: "?",
    wordCount: "~12K",
    lastUpdated: "2026-04-15",
    summary:
      "A corrupted terminal narrative threaded through memory loss, system instability, and interactive reader commentary. Navigate through glitched interfaces and fragmented memories in this experimental digital fiction.",
    path: "/fics/ef007e",
    isThemed: true,
    fandom: "Original Work",
    rating: "T",
    warnings: ["Graphic Depictions of Violence", "Memory Loss"],
    tags: ["Sci-Fi", "Interactive", "Corruption", "Terminal", "Experimental", "Memory Loss"],
    featuredTag: "Interactive Fiction"
  },
  {
    id: "future-fic",
    title: "Future Fic Slot",
    status: "Planned",
    chapters: 0,
    totalChapters: "?",
    wordCount: "0",
    lastUpdated: null,
    summary:
      "Reserved archive space for an upcoming fanwork entry. This slot awaits the next story to be catalogued in the celestial archives.",
    path: "/fics",
    isThemed: false,
    fandom: "TBD",
    rating: "NR",
    warnings: [],
    tags: ["Placeholder"],
    featuredTag: "Coming Soon"
  },
];

export default function Fics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const filteredAndSortedFics = useMemo(() => {
    let filtered = ficEntries.filter((fic) => {
      const matchesSearch = 
        fic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fic.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        fic.fandom.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        fic.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Sort by selected criteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "updated":
          if (!a.lastUpdated && !b.lastUpdated) return 0;
          if (!a.lastUpdated) return 1;
          if (!b.lastUpdated) return -1;
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case "chapters":
          return b.chapters - a.chapters;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy]);

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };
  return (
    <ArchiveLayout
      themeId="celestial"
      title="Fics"
      subtitle="Catalogued fanworks stored inside the archive. Some remain standard entries. Others operate as themed experiences."
    >
      <section className="archive-section">
        {/* Header with controls */}
        <div className="section-header">
          <div className="section-heading-row">
            <div>
              <p className="section-label">FANWORK INDEX</p>
              <h2 className="section-title">Available fic entries</h2>
              <p className="section-description">
                {filteredAndSortedFics.length} {filteredAndSortedFics.length === 1 ? 'entry' : 'entries'} found
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="archive-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search fics, tags, fandoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="archive-search"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="filter-row">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="archive-filter"
              >
                <option value="all">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="complete">Complete</option>
                <option value="planned">Planned</option>
                <option value="hiatus">Hiatus</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="archive-filter"
              >
                <option value="updated">Last Updated</option>
                <option value="title">Title A-Z</option>
                <option value="chapters">Chapter Count</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fics grid */}
        <div className="archive-grid">
          {filteredAndSortedFics.map((fic) => (
            <article key={fic.id} className={`archive-card ${fic.isThemed ? 'archive-card--themed' : ''}`}>
              <div className="archive-card-header">
                <div className="card-meta-row">
                  <span className="card-type">Fic</span>
                  <span className={`card-status card-status--${fic.status.toLowerCase()}`}>
                    {fic.status}
                  </span>
                  {fic.isThemed && <span className="card-badge">Themed Experience</span>}
                </div>
                
                <h3 className="card-title">{fic.title}</h3>
                <div className="card-meta">
                  <span className="card-fandom">{fic.fandom}</span>
                  <span className="card-rating">Rated {fic.rating}</span>
                  <span className="card-chapters">
                    {fic.chapters}/{fic.totalChapters} chapters
                  </span>
                  <span className="card-wordcount">{fic.wordCount} words</span>
                </div>
              </div>

              <div className="archive-card-body">
                <p className="card-summary">{fic.summary}</p>
                
                {fic.warnings.length > 0 && (
                  <div className="card-warnings">
                    <span className="warning-label">⚠️ Content Warnings:</span>
                    <div className="warning-tags">
                      {fic.warnings.map((warning) => (
                        <span key={warning} className="warning-tag">{warning}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-tags">
                  {fic.featuredTag && (
                    <span className="tag tag--featured">{fic.featuredTag}</span>
                  )}
                  {fic.tags.filter(tag => tag !== fic.featuredTag).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="archive-card-footer">
                <div className="card-updated">
                  Last updated: {formatDate(fic.lastUpdated)}
                </div>
                
                <Link 
                  to={fic.path} 
                  className={`card-link ${fic.status === 'Planned' ? 'card-link--disabled' : ''}`}
                  {...(fic.status === 'Planned' && { 
                    onClick: (e) => e.preventDefault(),
                    'aria-disabled': true 
                  })}
                >
                  {fic.status === 'Planned' ? 'Coming Soon' : 'Read Story'}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredAndSortedFics.length === 0 && (
          <div className="archive-empty">
            <div className="empty-icon">📚</div>
            <h3 className="empty-title">No fics found</h3>
            <p className="empty-text">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </section>
    </ArchiveLayout>
  );
}