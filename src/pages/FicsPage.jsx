import ArchiveLayout from "../components/layout/ArchiveLayout";
import ef007eMeta from "../works/ef007e/meta";

export default function FicPage() {
  const work = ef007eMeta;

  return (
    <ArchiveLayout
      themeId={work.theme}
      title={work.title}
      subtitle={work.summary}
    >
      <p>This is where your chapter system and comments will render.</p>
    </ArchiveLayout>
  );
}