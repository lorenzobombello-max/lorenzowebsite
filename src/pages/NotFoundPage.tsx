import { Link } from 'react-router-dom';
import { Section } from '../components/Section';

export function NotFoundPage() {
  return (
    <Section eyebrow="Pagina niet gevonden" title="Oeps, deze pagina bestaat niet." description="Ga terug naar de startpagina en kies een bestaande sectie of pagina." className="pt-20 text-center">
      <div className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-slate-200 bg-white/90 p-12 text-center shadow-soft">
        <p className="text-sm text-slate-500">De link die je gebruikte is niet beschikbaar of is verplaatst.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
          Terug naar startpagina
        </Link>
      </div>
    </Section>
  );
}
