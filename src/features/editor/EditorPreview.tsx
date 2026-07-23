import { useMemo, useState } from 'react';
import { Eye, Globe2, Lock, Palette, Wand2 } from 'lucide-react';
import { professionTemplates } from '../../data/templates';
import { Button } from '../../components/Button';
import { useLanguage, type Language } from '../../lib/language';
import { translations } from '../../lib/translations';

export function EditorPreview() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;
  const [selectedId, setSelectedId] = useState(professionTemplates[1].id);
  const selected = useMemo(() => professionTemplates.find((template) => template.id === selectedId) ?? professionTemplates[0], [selectedId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600"><Wand2 className="h-5 w-5" /></div>
          <div>
            <p className="font-semibold text-ink">AI Editor</p>
            <p className="text-sm text-slate-500">{t('editorPrompt')}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <label className="text-sm font-semibold text-slate-600" htmlFor="profession">{t('professionLabel')}</label>
          <select
            id="profession"
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value as typeof selectedId)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-ink outline-none ring-indigo-200 transition focus:ring-4"
          >
            {professionTemplates.map((template) => <option key={template.id} value={template.id}>{translations.templateTitles[language][template.id as keyof typeof translations.templateTitles.nl]}</option>)}
          </select>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><Palette className="h-4 w-4" /> {t('layoutsLabel')}</p>
            <div className="space-y-2">
              {selected.layouts.map((layout) => (
                <button key={layout.id} className="w-full rounded-2xl border border-slate-100 bg-white p-3 text-left transition hover:border-indigo-200 hover:shadow-soft">
                  <p className="text-sm font-semibold text-ink">{translations.templateLayoutNames[language][layout.id as keyof typeof translations.templateLayoutNames.nl]}</p>
                  <p className="mt-1 text-xs text-slate-500">{translations.templateLayoutFeatures[language][layout.id as keyof typeof translations.templateLayoutFeatures.nl].join(', ')}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>{t('previewModeLabel')}</strong> {t('previewModeText')}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Button variant="secondary"><Eye className="mr-2 h-4 w-4" /> {t('previewFree')}</Button>
            <Button><Lock className="mr-2 h-4 w-4" /> {t('publishAfterPayment')}</Button>
          </div>
        </div>
      </aside>
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-glow">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-green-400" /></div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"><Globe2 className="h-3 w-3" /> preview.lokale-ai.studio/{selected.id}</div>
        </div>
        <div className={`bg-gradient-to-br ${selected.gradient} p-6 md:p-10`}>
          <div className="rounded-[2rem] bg-white/85 p-6 shadow-soft backdrop-blur md:p-10">
            <nav className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3"><span className="text-4xl">{selected.previewImage}</span><div><p className="font-semibold text-ink">{translations.templateTitles[language][selected.id as keyof typeof translations.templateTitles.nl]}</p><p className="text-xs text-slate-500">{t('aiGeneratedWebsite')}</p></div></div>
              <Button className="px-4 py-2">{translations.templateConversionGoals[language][selected.id as keyof typeof translations.templateConversionGoals.nl]}</Button>
            </nav>
            <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-500 shadow-soft">{t('premiumLocalWebsite')}</p>
                <h3 className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">{translations.templateTaglines[language][selected.id as keyof typeof translations.templateTaglines.nl]}</h3>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{translations.templateDescriptions[language][selected.id as keyof typeof translations.templateDescriptions.nl]}</p>
                <div className="mt-8 flex flex-wrap gap-3">{translations.templateSections[language][selected.id as keyof typeof translations.templateSections.nl].slice(0, 3).map((section) => <span key={section} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{section}</span>)}</div>
              </div>
              <div className="rounded-[2rem] bg-ink p-5 text-white shadow-soft">
                <p className="text-sm text-white/60">{t('websiteScore')}</p>
                <p className="mt-2 text-5xl font-semibold">94%</p>
                <div className="mt-6 space-y-3">
                  {translations.templateSections[language][selected.id as keyof typeof translations.templateSections.nl].map((section) => <div key={section} className="rounded-2xl bg-white/10 p-3 text-sm">✓ {section}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
