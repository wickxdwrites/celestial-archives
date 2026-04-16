import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import ArchiveLayout from "../components/layout/ArchiveLayout";
import "./Originals.css";

const originalEntries = [
  {
    id: "celestial-fragments",
    title: "Celestial Fragments",
    status: "In Development",
    format: "Original Story Collection",
    genre: "Science Fiction",
    setting: "Distant Future",
    wordCount: "~8K",
    lastUpdated: "2026-04-10",
    summary:
      "A collection of interconnected stories exploring memory, identity, and consciousness in a universe where celestial archives store the experiences of entire civilizations. Each fragment offers a glimpse into different corners of this vast cosmos.",
    path: "/originals/celestial-fragments",
    isCollection: true,
    completionStatus: "25%",
    themes: ["Memory", "Identity", "Consciousness", "Technology"],
    tags: ["Original", "Sci-Fi", "Archive", "Philosophy", "Space Opera"],
    featuredTag: "Featured Collection",
    mature: false,
    warnings: ["Existential Themes"]
  },
  {
    id: "data-ghost",
    title: "The Data Ghost",
    status: "Drafting",
    format: "Novella",
    genre: "Cyberpunk Horror",
    setting: "Near Future",
    wordCount: "~15K",
    lastUpdated: "2026-04-08",
    summary:
      "When a digital forensics expert discovers fragments of consciousness embedded in corrupted data files, they must navigate a digital afterlife where deleted memories fight to survive.",
    path: "/originals/data-ghost",
    isCollection: false,
    completionStatus: "60%",
    themes: ["Digital Death", "Memory", "Horror", "Technology"],
    tags: ["Cyberpunk", "Horror", "Thriller", "Digital", "AI"],
    featuredTag: "Horror Novella",
    mature: true,
    warnings: ["Body Horror", "Psychological Themes", "Existential Dread"]
  },
  {
    id: "star-cartographer",
    title: "The Star Cartographer's Daughter",
    status: "Outlined",
    format: "Novel",
    genre: "Space Fantasy",
    setting: "Mythical Universe",
    wordCount: "0",
    lastUpdated: "2026-03-25",
    summary:
      "In a universe where stars are mapped by ancient magic rather than technology, a young cartographer's daughter must chart unknown territories to save her homeland from an encroaching void.",
    path: "/originals",
    isCollection: false,
    completionStatus: "5%",
    themes: ["Adventure", "Magic", "Family", "Discovery"],
    tags: ["Fantasy", "Adventure", "Magic", "Coming of Age", "Space"],
    featuredTag: "Epic Fantasy",
    mature: false,
    warnings: []
  },
  {
    id: "memory-merchants",
    title: "Memory Merchants",
    status: "Concept",
    format: "Short Story",
    genre: "Science Fiction",
    setting: "Dystopian Future",
    wordCount: "0",
    lastUpdated: null,
    summary:
      "In a world where memories can be extracted and sold, black market dealers trade in stolen experiences while the original owners struggle with gaps in their identity.",
    path: "/originals",
    isCollection: false,
    completionStatus: "0%",
    themes: ["Memory Trade", "Identity", "Dystopia", "Ethics"],
    tags: ["Sci-Fi", "Dystopian", "Short Story", "Memory", "Ethics"],
    featuredTag: "Concept Stage",
    mature: true,
    warnings: ["Memory Manipulation", "Psychological Themes"]
  }
];

export default function Originals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [showMature, setShowMature] = useState(false);

  const filteredAndSortedWorks = useMemo(() => {
    let filtered = originalEntries.filter((work) => {
      const matchesSearch = 
        work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase())) ||
        work.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        work.genre.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        work.status.toLowerCase().replace(" ", "-") === statusFilter.toLowerCase();
      
      const matchesGenre = 
        genreFilter === "all" ||
        work.genre.toLowerCase().replace(" ", "-") === genreFilter.toLowerCase();
        
      const matureFilter = showMature || !work.mature;
      
      return matchesSearch && matchesStatus && matchesGenre && matureFilter;
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
        case "progress":
          return parseInt(b.completionStatus) - parseInt(a.completionStatus);
        case "genre":
          return a.genre.localeCompare(b.genre);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, genreFilter, sortBy, showMature]);

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const getProgressColor = (percent) => {
    const num = parseInt(percent);
    if (num === 0) return "#666";
    if (num <= 25) return "#ff7878";
    if (num <= 50) return "#ffb464";
    if (num <= 75) return "#70ff9a";
    return "#78c8ff";
  };
  return (
    <ArchiveLayout
      themeId="celestial"
      title="Originals"
      subtitle="Independent works, concepts, fragments, and future records preserved under the Celestial Archive."
    >
      <section className="archive-section">
        {/* Header with controls */}
        <div className="section-header">
          <div className="section-heading-row">
            <div>
              <p className="section-label">ORIGINAL INDEX</p>
              <h2 className="section-title">Stored original entries</h2>
              <p className="section-description">
                {filteredAndSortedWorks.length} {filteredAndSortedWorks.length === 1 ? 'work' : 'works'} found
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="archive-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search works, themes, genres..."
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
                <option value="in-development">In Development</option>
                <option value="drafting">Drafting</option>
                <option value="outlined">Outlined</option>
                <option value="concept">Concept</option>
                <option value="complete">Complete</option>
                <option value="published">Published</option>
              </select>

              <select 
                value={genreFilter} 
                onChange={(e) => setGenreFilter(e.target.value)}
                className="archive-filter"
              >
                <option value="all">All Genres</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="cyberpunk-horror">Cyberpunk Horror</option>
                <option value="space-fantasy">Space Fantasy</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="archive-filter"
              >
                <option value="updated">Last Updated</option>
                <option value="title">Title A-Z</option>
                <option value="progress">Progress</option>
                <option value="genre">Genre</option>
              </select>

              <label className="mature-toggle">
                <input
                  type="checkbox"
                  checked={showMature}
                  onChange={(e) => setShowMature(e.target.checked)}
                />
                <span className="toggle-text">Show Mature</span>
              </label>
            </div>
          </div>
        </div>

        {/* Works grid */}
        <div className="archive-grid">
          {filteredAndSortedWorks.map((work) => (
            <article key={work.id} className={`original-card ${work.mature ? 'original-card--mature' : ''}`}>
              <div className="original-card-header">
                <div className="card-meta-row">
                  <span className="card-format">{work.format}</span>
                  <span className={`card-status card-status--${work.status.toLowerCase().replace(" ", "-")}`}>
                    {work.status}
                  </span>
                  {work.mature && <span className="mature-badge">18+</span>}
                </div>
                
                <h3 className="card-title">{work.title}</h3>
                <div className="card-meta">
                  <span className="card-genre">{work.genre}</span>
                  <span className="card-setting">{work.setting}</span>
                  <span className="card-wordcount">{work.wordCount} words</span>
                  {work.isCollection && <span className="collection-badge">Collection</span>}
                </div>
              </div>

              <div className="original-card-body">
                <p className="card-summary">{work.summary}</p>
                
                {/* Progress bar */}
                <div className="progress-section">
                  <div className="progress-label">
                    <span>Completion Progress</span>
                    <span className="progress-percent">{work.completionStatus}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{
                        width: work.completionStatus,
                        backgroundColor: getProgressColor(work.completionStatus)
                      }}
                    />
                  </div>
                </div>
                
                {/* Themes */}
                <div className="themes-section">
                  <span className="themes-label">Key Themes:</span>
                  <div className="themes-list">
                    {work.themes.map((theme) => (
                      <span key={theme} className="theme-chip">{theme}</span>
                    ))}
                  </div>
                </div>

                {work.warnings.length > 0 && (
                  <div className="card-warnings">
                    <span className="warning-label">⚠️ Content Notes:</span>
                    <div className="warning-tags">
                      {work.warnings.map((warning) => (
                        <span key={warning} className="warning-tag">{warning}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-tags">
                  {work.featuredTag && (
                    <span className="tag tag--featured">{work.featuredTag}</span>
                  )}
                  {work.tags.filter(tag => tag !== work.featuredTag).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="original-card-footer">
                <div className="card-updated">
                  Last updated: {formatDate(work.lastUpdated)}
                </div>
                
                <Link 
                  to={work.path} 
                  className={`card-link ${['Concept', 'Outlined'].includes(work.status) ? 'card-link--disabled' : ''}`}
                  {...(['Concept', 'Outlined'].includes(work.status) && { 
                    onClick: (e) => e.preventDefault(),
                    'aria-disabled': true 
                  })}
                >
                  {['Concept', 'Outlined'].includes(work.status) ? 'In Development' : 'Read Work'}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredAndSortedWorks.length === 0 && (
          <div className="archive-empty">
            <div className="empty-icon">📜</div>
            <h3 className="empty-title">No works found</h3>
            <p className="empty-text">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </section>
    </ArchiveLayout>
  );
}