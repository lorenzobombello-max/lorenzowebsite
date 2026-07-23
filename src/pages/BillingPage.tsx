import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { BillingPlans } from '../features/billing/BillingPlans';

export function BillingPage() {
  return (
    <>
      <Section eyebrow="Stripe billing" title="Kies een abonnement en activeer betalingen." description="Onze structuur ondersteunt veilige abonnementen, éénmalige betalingen en automatische verlenging via Stripe." className="pt-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm text-slate-600">Bekijk de plannen, kies een pakket en ga verder met de publicatie flow.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
            Terug naar startpagina
          </Link>
        </div>
      </Section>
      <Section className="pt-0">
        <BillingPlans />
      </Section>
    </>
  );
}
