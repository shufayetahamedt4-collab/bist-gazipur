import React, { useEffect, useState } from 'react';
import { AlertTriangle, ExternalLink, Loader2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMBED_TIMEOUT_MS } from '../../config/siteLinks';
import { LocalizedString } from '../../types';

type EmbedStatus = 'loading' | 'loaded' | 'blocked';

export interface OfficialEmbedProps {
  /** The authority's own page, opened in a new tab from the fallback card. */
  url: string;
  /** Shown as the frame title and in the fallback copy. */
  authority: LocalizedString;
  /** What the visitor should look for on that page. */
  hint: LocalizedString;
}

/**
 * Tries to show an authority's official page inline, and never leaves a blank box.
 *
 * A government site can refuse framing through `X-Frame-Options: DENY` or a CSP
 * `frame-ancestors` rule, and neither is readable from JavaScript. The only
 * honest signal available is that such a frame never reports `load`, so the panel
 * waits `EMBED_TIMEOUT_MS` and then swaps the frame for a fallback card carrying a
 * direct link to the official page. The same link is always present next to the
 * frame, so even a frame that renders its own error page cannot trap the visitor.
 */
export const OfficialEmbed: React.FC<OfficialEmbedProps> = ({ url, authority, hint }) => {
  const { language, theme } = useApp();
  const isBn = language === 'bn';
  const [status, setStatus] = useState<EmbedStatus>('loading');

  // Re-arm the timeout whenever the target URL changes.
  useEffect(() => {
    setStatus('loading');
    const timer = window.setTimeout(() => {
      setStatus((prev) => (prev === 'loaded' ? prev : 'blocked'));
    }, EMBED_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [url]);

  const panelClass = `rounded-3xl border overflow-hidden ${
    theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
  }`;

  const openLabel = isBn ? 'অফিসিয়াল যাচাইকরণ পেজ খুলুন' : 'Open official verification page';

  if (status === 'blocked') {
    return (
      <div className={`${panelClass} p-6 sm:p-8 space-y-4`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className={`font-heading font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {isBn
                ? `${authority.bn}-এর পেজটি এখানে এমবেড করা যাচ্ছে না`
                : `The ${authority.en} page cannot be embedded here`}
            </h3>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {isBn
                ? 'সরকারি ওয়েবসাইটগুলো প্রায়ই অন্য সাইটে দেখানো (iframe) বন্ধ রাখে। নিরাপত্তার কারণেই এটি হয় — নিচের বাটনে ক্লিক করে সরাসরি অফিসিয়াল সাইটে যাচাই করুন।'
                : 'Government sites commonly block being displayed inside another site for security. Use the button below to verify directly on the official site.'}
            </p>
          </div>
        </div>

        <p className={`text-xs rounded-2xl border p-4 ${
          theme === 'dark' ? 'bg-black/30 border-white/10 text-slate-300' : 'bg-emerald-50/60 border-emerald-200 text-slate-700'
        }`}
        >
          {isBn ? hint.bn : hint.en}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 text-slate-950 font-heading font-bold text-xs transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{openLabel}</span>
        </a>
      </div>
    );
  }

  return (
    <div className={panelClass}>
      {/* Always-visible header keeps an escape hatch next to the frame itself. */}
      <div
        className={`px-4 sm:px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-white/10' : 'border-emerald-100'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className={`text-xs font-semibold truncate ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
            {isBn ? authority.bn : authority.en}
          </span>
          {status === 'loading' && (
            <span className={`inline-flex items-center gap-1 text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <Loader2 className="w-3 h-3 animate-spin" />
              {isBn ? 'লোড হচ্ছে…' : 'loading…'}
            </span>
          )}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{openLabel}</span>
        </a>
      </div>

      <div className="relative w-full h-[380px] sm:h-[520px] bg-slate-100 dark:bg-black/30">
        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {isBn
                ? 'অফিসিয়াল পেজ লোড করা হচ্ছে। না এলে স্বয়ংক্রিয়ভাবে বিকল্প কার্ড দেখানো হবে।'
                : 'Loading the official page. If it cannot be shown, a fallback card appears automatically.'}
            </p>
          </div>
        )}

        <iframe
          src={url}
          title={isBn ? authority.bn : authority.en}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('blocked')}
          className={`w-full h-full border-0 ${status === 'loading' ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      <p className={`px-4 sm:px-5 py-3 border-t text-[11px] ${
        theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-emerald-100 text-slate-500'
      }`}
      >
        {isBn ? hint.bn : hint.en}
      </p>
    </div>
  );
};
