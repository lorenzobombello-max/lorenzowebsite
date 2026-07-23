import { Check, CreditCard, QrCode } from 'lucide-react';
import { subscriptionPlans } from '../../data/projects';
import { useLanguage, type Language } from '../../lib/language';
import { translations } from '../../lib/translations';
import { cn } from '../../lib/utils';

export function BillingPlans() {
  const { language } = useLanguage();
  const t = <K extends keyof typeof translations>(key: K) => (translations[key] as Record<Language, any>)[language] as string;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {subscriptionPlans.map((plan) => (
        <article key={plan.id} className={cn('rounded-[2rem] border bg-white p-6 shadow-soft', plan.highlighted ? 'border-indigo-300 ring-4 ring-indigo-100' : 'border-white/80')}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-semibold text-ink">{plan.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{plan.description}</p>
            </div>
            {plan.highlighted && <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">{t('popular')}</span>}
          </div>
          <p className="mt-6 text-4xl font-semibold text-ink">{plan.price}</p>
          <button className={cn('mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition', plan.highlighted ? 'bg-ink text-white' : 'bg-slate-100 text-ink hover:bg-slate-200')}>
            <CreditCard className="h-4 w-4" /> {t('startStripeCheckout')}
          </button>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700"><QrCode className="h-4 w-4" /> {t('paymentReady')}</div>
          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-600"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" /> {feature}</li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">Stripe lookup key: <code>{plan.stripeLookupKey}</code></p>
        </article>
      ))}
    </div>
  );
}
