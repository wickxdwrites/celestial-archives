import { getTheme } from "../../themes/registry";

export default function ArchiveLayout({
  themeId = "celestial",
  title,
  subtitle,
  children,
}) {
  const theme = getTheme(themeId);

  return (
    <div className={`archive-layout ${theme.classes.page}`}>
      <div className="archive-overlay" />

      <main className="archive-shell">
        <header className={`archive-header ${theme.classes.panel} ${theme.classes.border}`}>
          <p className="archive-kicker">CELESTIAL ARCHIVE</p>
          <h1 className={theme.classes.title}>{title}</h1>
          {subtitle && <p className={`archive-subtitle ${theme.classes.text}`}>{subtitle}</p>}
        </header>

        <section className={`archive-content ${theme.classes.panel} ${theme.classes.border}`}>
          {children}
        </section>
      </main>
    </div>
  );
}