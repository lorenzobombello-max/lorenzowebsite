import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { EditorPreview } from '../features/editor/EditorPreview';

export function EditorPage() {
  return (
    <>
      <Section eyebrow="AI editor" title="Bewerk jouw website met intelligente secties en live preview." description="Kies een beroep, selecteer een layout en bekijk meteen hoe jouw website er uitziet in de preview." className="pt-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm text-slate-600">Je kunt hier meteen een demo-template selecteren en de preview voor jouw website bekijken.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
            Terug naar startpagina
          </Link>
        </div>
      </Section>
      <Section className="pt-0">
        <EditorPreview />
      </Section>
    </>
  );
}
