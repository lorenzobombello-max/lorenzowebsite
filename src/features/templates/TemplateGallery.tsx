import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { professionTemplates } from '../../data/templates';
import { useLanguage, type Language } from '../../lib/language';
import { translations } from '../../lib/translations';

export function TemplateGallery() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {professionTemplates.map((template, index) => (
        <motion.article
          key={template.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: index * 0.04 }}
          className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow"
        >
          <div className={`relative min-h-64 bg-gradient-to-br ${template.gradient} p-6`}>
            <div className="absolute inset-0 bg-hero-grid bg-[length:22px_22px] opacity-40" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 backdrop-blur">{template.layouts.length} {t('templateLayoutsLabel')}</span>
                <span className="text-5xl drop-shadow-sm">{template.previewImage}</span>
              </div>
              <div className="mt-20 rounded-3xl bg-white/75 p-5 shadow-soft backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-semibold text-indigo-500"><Sparkles className="h-4 w-4" /> {translations.templateConversionGoals[language][template.id as keyof typeof translations.templateConversionGoals.nl]}</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{translations.templateTitles[language][template.id as keyof typeof translations.templateTitles.nl]}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{translations.templateTaglines[language][template.id as keyof typeof translations.templateTaglines.nl]}</p>
              </div>
            </div>
          </div>
          <div className="space-y-5 p-6">
            <p className="text-sm leading-6 text-slate-600">{translations.templateDescriptions[language][template.id as keyof typeof translations.templateDescriptions.nl]}</p>
            <div className="grid gap-3">
              {template.layouts.map((layout) => (
                <div key={layout.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{translations.templateLayoutNames[language][layout.id as keyof typeof translations.templateLayoutNames.nl]}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs capitalize text-slate-500">{layout.style}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{translations.templateLayoutFeatures[language][layout.id as keyof typeof translations.templateLayoutFeatures.nl].join(' · ')}</p>
                </div>
              ))}
            </div>
            <button className="flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-4 text-sm font-semibold text-white transition group-hover:bg-indigo-600">
              {translations.templateSelect[language].replace('{template}', translations.templateTitles[language][template.id as keyof typeof translations.templateTitles.nl])} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
