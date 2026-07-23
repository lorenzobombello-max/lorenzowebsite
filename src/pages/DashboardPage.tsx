import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { Dashboard } from '../features/dashboard/Dashboard';

export function DashboardPage() {
  return (
    <>
      <Section eyebrow="Gebruikersdashboard" title="Beheer projecten, domeinen en facturatie vanuit één plek." description="Een overzichtelijk dashboard voor concepten, preview-shares en betaalde publicaties." className="pt-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm text-slate-600">Open een project of ga terug naar de hoofdpagina om verder te bouwen.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
            Terug naar startpagina
          </Link>
        </div>
      </Section>
      <Section className="pt-0">
        <Dashboard />
      </Section>
    </>
  );
}
