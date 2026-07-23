import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { StatPill } from '../components/StatPill';
import { BillingPlans } from '../features/billing/BillingPlans';
import { Dashboard } from '../features/dashboard/Dashboard';
import { EditorPreview } from '../features/editor/EditorPreview';
import { PublishFlow } from '../features/publish/PublishFlow';
import { TemplateGallery } from '../features/templates/TemplateGallery';

export function HomePage() {
  const navigate = useNavigate();

  const architecture = [
    { icon: Bot, title: 'Template engine', text: 'Tien beroepen met meerdere layouts, secties en conversiedoelen.' },
    { icon: Sparkles, title: 'AI editor', text: 'Modulaire editor met live preview, contentblokken en gratis preview mode.' },
    { icon: Bot, title: 'Billing layer', text: 'Stripe Checkout voorbereidingen voor abonnementen, bankkaart, Bancontact en QR.' },
    { icon: Sparkles, title: 'Domain automation', text: 'Domeinchecker en DNS-record voorbereiding voor automatische koppeling.' },
    { icon: Bot, title: 'Account systeem', text: 'Architectuur voor magic links, OAuth, rollen en veilige sessies.' },
  ];

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Section className="pb-12 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4" /> Premium AI SaaS voor lokale zelfstandigen
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-ink sm:text-7xl lg:text-8xl">
              Bouw, preview en publiceer professionele websites per beroep.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
              Een schaalbare website-builder voor lokale ondernemers: grote template previews, live editor, gratis preview mode, Stripe abonnementen en automatische domeinkoppeling voorbereid.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button className="px-7 py-4 text-base" onClick={() => navigate('/templates')}>
                Start met AI template <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" className="px-7 py-4 text-base" onClick={() => navigate('/dashboard')}>
                Bekijk dashboard
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <StatPill value="10" label="beroepen inbegrepen" />
              <StatPill value="30+" label="layout varianten" />
              <StatPill value="0€" label="preview vóór publicatie" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-white/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-4 shadow-glow backdrop-blur">
              <div className="rounded-[2rem] bg-gradient-to-br from-lilac via-white to-mint p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-ink">Live builder</span>
                  <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">Preview actief</span>
                </div>
                <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-ink text-3xl">⚡</div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Elektricien</p>
                      <h2 className="text-3xl font-semibold">Electro Vermeulen</h2>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-3">
                    {['Spoedinterventie knop', 'Keuringen & renovaties', 'Offerteformulier', 'Domein electrovermeulen.be'].map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600">✓ {item}</div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-3xl bg-ink p-5 text-white">
                    <p className="text-sm text-white/60">Publicatie status</p>
                    <p className="mt-2 text-2xl font-semibold">Wacht op Stripe Checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section
        eyebrow="Professionele architectuur"
        title="Gebouwd als een schaalbaar AI SaaS-platform, niet als simpele demo."
        description="De codebase bevat duidelijke feature-modules voor templates, editor, billing, publicatie, domeinen, accounts en dashboardbeheer."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {architecture.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-soft backdrop-blur">
              <item.icon className="h-6 w-6 text-indigo-500" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="templates" eyebrow="Template gallery" title="Grote previews per beroep met meerdere commerciële layouts." description="Van lunapark tot elektricien en lasser: elk beroep krijgt eigen secties, CTA’s en conversieflow.">
        <TemplateGallery />
      </Section>

      <Section id="editor" eyebrow="Editor + live preview" title="Gratis previewen, pas betalen bij publicatie." description="Een premium builder-ervaring met realtime selectie van beroep, layout en websiteblokken.">
        <EditorPreview />
      </Section>

      <Section eyebrow="Publish flow" title="Van preview naar betaalde publicatie met domein en verlenging." description="De flow is voorbereid op productie: Stripe webhooks, subscriptions, DNS-activatie en lifecycle beheer.">
        <PublishFlow />
      </Section>

      <Section id="billing" eyebrow="Stripe billing" title="Abonnementen voorbereid voor bankkaart, Bancontact en QR-code flow." description="Publicatie wordt geblokkeerd tot betaling succesvol is; abonnementen en automatische verlenging zijn voorbereid in de billinglaag.">
        <BillingPlans />
      </Section>

      <Section id="dashboard" eyebrow="Gebruikersdashboard" title="Beheer projecten, statussen, domeinen en facturatie." description="Zelfstandigen kunnen concepten bewaren, previews delen en gepubliceerde websites beheren.">
        <Dashboard />
      </Section>
    </main>
  );
}
