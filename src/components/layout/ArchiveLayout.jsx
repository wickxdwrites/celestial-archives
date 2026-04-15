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

      <main className="archive-shell archive-shell--wide">
        <section className="archive-content">
          {children}
        </section>
      </main>
    </div>
  );
}