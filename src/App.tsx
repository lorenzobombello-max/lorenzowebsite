import { motion } from 'framer-motion';
import { ArrowRight, Bot, CreditCard, Database, Globe2, LayoutTemplate, Lock, Sparkles, Wand2 } from 'lucide-react';
import { Button } from './components/Button';
import { LanguageToggle } from './components/LanguageToggle';
import { Section } from './components/Section';
import { StatPill } from './components/StatPill';
import { BillingPlans } from './features/billing/BillingPlans';
import { Dashboard } from './features/dashboard/Dashboard';
import { EditorPreview } from './features/editor/EditorPreview';
import { PublishFlow } from './features/publish/PublishFlow';
import { TemplateGallery } from './features/templates/TemplateGallery';
import { useLanguage, type Language } from './lib/language';
import { translations } from './lib/translations';

function App() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;

  const architecture = [
    { icon: LayoutTemplate, title: t('architectureBlockTitle'), text: t('architectureBlockText1') },
    { icon: Wand2, title: 'AI editor', text: t('architectureBlockText2') },
    { icon: CreditCard, title: 'Billing layer', text: t('architectureBlockText3') },
    { icon: Globe2, title: 'Domain automation', text: t('architectureBlockText4') },
    { icon: Database, title: 'Project storage', text: t('architectureBlockText5') },
    { icon: Lock, title: 'Account systeem', text: t('architectureBlockText6') },
  ];

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-gradient-to-br from-blush via-cream to-skysoft" />
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white shadow-soft"><Bot className="h-6 w-6" /></div>
          <div>
            <p className="text-lg font-semibold tracking-tight">{t('brand')}</p>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">{t('brandSubtitle')}</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#templates">{t('navTemplates')}</a>
          <a href="#editor">{t('navEditor')}</a>
          <a href="#billing">{t('navPricing')}</a>
          <a href="#dashboard">{t('navDashboard')}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button variant="secondary">{t('loginButton')}</Button>
        </div>
      </header>

      <Section className="pb-12 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4" /> {t('premiumBadge')}
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-ink sm:text-7xl lg:text-8xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
              {t('heroDescription')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button className="px-7 py-4 text-base">{t('ctaStart')} <ArrowRight className="ml-2 h-5 w-5" /></Button>
              <Button variant="secondary" className="px-7 py-4 text-base">{t('ctaDashboard')}</Button>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <StatPill value="10" label={t('statWorkshops')} />
              <StatPill value="30+" label={t('statLayouts')} />
              <StatPill value="0€" label={t('statPreview')} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-white/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-4 shadow-glow backdrop-blur">
              <div className="rounded-[2rem] bg-gradient-to-br from-lilac via-white to-mint p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-ink">{t('liveBuilder')}</span>
                  <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">{t('previewActive')}</span>
                </div>
                <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-ink text-3xl">⚡</div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">{t('electrician')}</p>
                      <h2 className="text-3xl font-semibold">Electro Vermeulen</h2>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-3">
                    {['Spoedinterventie knop', 'Keuringen & renovaties', 'Offerteformulier', 'Domein electrovermeulen.be'].map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600">✓ {item}</div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-3xl bg-ink p-5 text-white">
                    <p className="text-sm text-white/60">{t('publishStatus')}</p>
                    <p className="mt-2 text-2xl font-semibold">{t('waitStripe')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section
        eyebrow={t('architectureSectionEyebrow')}
        title={t('architectureSectionTitle')}
        description={t('architectureSectionDescription')}
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

      <Section id="templates" eyebrow={t('templateGalleryEyebrow')} title={t('templateGalleryTitle')} description={t('templateGalleryDescription')}>
        <TemplateGallery />
      </Section>

      <Section id="editor" eyebrow={t('editorPreviewEyebrow')} title={t('editorPreviewTitle')} description={t('editorPreviewDescription')}>
        <EditorPreview />
      </Section>

      <Section eyebrow={t('publishFlowEyebrow')} title={t('publishFlowTitle')} description={t('publishFlowDescription')}>
        <PublishFlow />
      </Section>

      <Section id="billing" eyebrow={t('pricingEyebrow')} title={t('pricingTitle')} description={t('pricingDescription')}>
        <BillingPlans />
      </Section>

      <Section id="dashboard" eyebrow={t('dashboardEyebrow')} title={t('dashboardTitle')} description={t('dashboardDescription')}>
        <Dashboard />
      </Section>

      <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-ink p-8 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-semibold">{t('brand')}</p>
            <p className="mt-2 text-white/60">{t('footerTagline')}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{t('footerTech')}</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{t('footerTailwind')}</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{t('footerStripe')}</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{t('footerDomain')}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
