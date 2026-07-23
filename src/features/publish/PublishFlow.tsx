import { CheckCircle2, CreditCard, Eye, Globe2, Rocket, ShieldCheck } from 'lucide-react';
import { useLanguage, type Language } from '../../lib/language';
import { translations } from '../../lib/translations';

export function PublishFlow() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;
  const steps = [
    { icon: Eye, title: 'Gratis preview', text: 'Gebruiker bouwt met AI, kiest beroep/layout en deelt een preview-link zonder betaalverplichting.' },
    { icon: CreditCard, title: 'Stripe abonnement', text: 'Publicatie vraagt Checkout Subscription met kaart, Bancontact of QR-compatibele betaalmethodes.' },
    { icon: Globe2, title: 'Automatische domeinkoppeling', text: 'Domeinchecker bereidt beschikbaarheid, DNS-records en registrar/Vercel Domains integratie voor.' },
    { icon: Rocket, title: 'Live publicatie', text: 'Na succesvolle webhook wordt hosting geactiveerd en projectstatus naar gepubliceerd gezet.' },
    { icon: ShieldCheck, title: 'Automatische verlenging', text: 'Stripe subscription lifecycle en domeinrenewal jobs houden websites actief.' },
    { icon: CheckCircle2, title: 'Dashboard beheer', text: 'Projecten, facturatie, domeinen en revisies blijven beheersbaar voor zelfstandige of studio.' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step.title} className="rounded-3xl border border-white/80 bg-white/75 p-6 shadow-soft backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-semibold text-indigo-600">{index + 1}</span>
            <step.icon className="h-5 w-5 text-indigo-500" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
