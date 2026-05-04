import { Link, useLocation } from "react-router-dom";
import { getTheme } from "../../themes/registry";

export default function ArchiveLayout({
  themeId = "celestial",
  title,
  subtitle,
  children,
}) {
  const theme = getTheme(themeId);
  const location = useLocation();
  const showHomeLink = location.pathname !== "/";

  return (
    <div className={`archive-layout ${theme.classes.page}`}>
      <div className="archive-overlay" />
      {showHomeLink && (
        <Link to="/" className="archive-home-link">
          Home
        </Link>
      )}

      <main className="archive-shell archive-shell--wide">
        <section className="archive-content">
          {children}
        </section>
      </main>
    </div>
  );
}