import { BarChart3, CreditCard, FolderKanban, Globe2 } from 'lucide-react';
import { demoProjects } from '../../data/projects';
import { useLanguage, type Language } from '../../lib/language';
import { translations } from '../../lib/translations';
import { formatStatus } from '../../lib/utils';

export function Dashboard() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;
  const metrics = [
    { label: t('projectsStored'), value: '12', icon: FolderKanban },
    { label: t('previewShares'), value: '428', icon: BarChart3 },
    { label: t('activeDomains'), value: '7', icon: Globe2 },
    { label: t('mrrManaged'), value: '€413', icon: CreditCard },
  ];

  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">{t('dashboardEyebrow')}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{t('dashboardFeatureTitle')}</h3>
        </div>
        <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{t('newAiProject')}</button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
            <metric.icon className="h-5 w-5 text-indigo-500" />
            <p className="mt-4 text-3xl font-semibold text-ink">{metric.value}</p>
            <p className="text-sm text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100">
        {demoProjects.map((project) => (
          <div key={project.id} className="grid gap-4 border-b border-slate-100 bg-white p-5 last:border-b-0 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <p className="font-semibold text-ink">{project.name}</p>
              <p className="mt-1 text-sm text-slate-500">{project.domain ?? t('domainPending')} · {t('lastUpdated')} {project.updatedAt}</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">{formatStatus(project.status, language)}</span>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink">{t('openEditor')}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
