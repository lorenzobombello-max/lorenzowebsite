import { Globe2 } from 'lucide-react';
import { useLanguage, type Language } from '../lib/language';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-1 shadow-soft backdrop-blur">
      <Globe2 className="h-4 w-4 text-slate-500" />
      <button
        type="button"
        onClick={() => toggleLanguage('nl')}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${language === 'nl' ? 'bg-ink text-white' : 'text-slate-500 hover:text-ink'}`}
      >
        NL
      </button>
      <button
        type="button"
        onClick={() => toggleLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${language === 'en' ? 'bg-ink text-white' : 'text-slate-500 hover:text-ink'}`}
      >
        EN
      </button>
    </div>
  );
}
