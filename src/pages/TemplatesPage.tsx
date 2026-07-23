import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { TemplateGallery } from '../features/templates/TemplateGallery';

export function TemplatesPage() {
  return (
    <>
      <Section eyebrow="Template gallery" title="Kies een AI-design voor jouw volgende website." description="Bekijk alle beschikbare beroeps-templates en start met het juiste ontwerp voor jouw klant." className="pt-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm text-slate-600">Klik op een template om direct naar de editor te gaan en jouw website aan te passen.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
            Terug naar startpagina
          </Link>
        </div>
      </Section>
      <Section className="pt-0">
        <TemplateGallery />
      </Section>
    </>
  );
}
