import React, { useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Eye,
  ImagePlus,
  Lock,
  Pencil,
  Plus,
  Save,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ANNOUNCEMENT_DISMISS_KEY } from '../features/AnnouncementPopup';
import { AnnouncementPost, LocalizedString } from '../../types';

/** Same demo staff password the Activity composer and admin dashboard use. */
const STAFF_PASSWORD = 'bist2026';

/** Uploads share one ~5 MB localStorage quota with everything else on the site. */
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

const emptyPost = (order: number): AnnouncementPost => ({
  id: '',
  image: '',
  title: { en: '', bn: '' },
  description: { en: '', bn: '' },
  link: '',
  linkLabel: { en: '', bn: '' },
  active: true,
  order,
  startDate: '',
  endDate: '',
  category: 'announcement',
});

/**
 * Announcement popup editor, reached at `#/admin/popups`.
 *
 * Gated with the same demo staff password as the other staff screens. Posts are
 * held in the app context, which persists them to localStorage under
 * `bist_announcements`, so whatever is saved here is what the public popup shows.
 */
export const PopupAdminPage: React.FC = () => {
  const {
    language,
    theme,
    announcements,
    upsertAnnouncement,
    deleteAnnouncement,
    moveAnnouncement,
    navigateTo,
  } = useApp();
  const isBn = language === 'bn';

  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<AnnouncementPost | null>(null);
  const [uploadNote, setUploadNote] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const sorted = [...announcements].sort((a, b) => a.order - b.order);

  const unlock = () => {
    if (password.trim() !== STAFF_PASSWORD) {
      setError(isBn ? 'পাসওয়ার্ড সঠিক নয়।' : 'That password is not right.');
      return;
    }
    setError('');
    setUnlocked(true);
  };

  const startNew = () => {
    setUploadNote('');
    setDraft(emptyPost(sorted.length + 1));
  };

  const startEdit = (post: AnnouncementPost) => {
    setUploadNote('');
    setDraft({ ...post });
  };

  const saveDraft = () => {
    if (!draft) return;
    const title = draft.title.en.trim() || draft.title.bn.trim();
    if (!title) {
      setUploadNote(isBn ? 'শিরোনাম ছাড়া সংরক্ষণ করা যাবে না।' : 'A title is required before saving.');
      return;
    }
    const id = draft.id || `ann-${Date.now()}`;
    upsertAnnouncement({ ...draft, id });
    setDraft(null);
    setUploadNote(isBn ? 'সংরক্ষিত হয়েছে।' : 'Saved.');
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadNote(
        isBn
          ? `ফাইলটি বড় (${(file.size / 1024 / 1024).toFixed(1)}MB)। সর্বোচ্চ ২MB — ছবির লিংক ব্যবহার করুন।`
          : `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. The limit is 2MB — paste an image link instead.`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((prev) => (prev ? { ...prev, image: String(reader.result) } : prev));
      setUploadNote('');
    };
    reader.readAsDataURL(file);
  };

  /** Clear this session's dismissal so the popup can be seen immediately. */
  const previewPopup = () => {
    try {
      window.sessionStorage.removeItem(ANNOUNCEMENT_DISMISS_KEY);
    } catch {
      // Nothing to clear in a browser that blocks sessionStorage.
    }
    navigateTo('home');
  };

  const fieldClass = `w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 transition-colors ${
    theme === 'dark'
      ? 'bg-black/40 border-white/10 text-white placeholder:text-slate-500'
      : 'bg-white border-emerald-200 text-slate-800 placeholder:text-slate-400'
  }`;

  const labelClass = `block text-[11px] font-semibold mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`;

  const localized = (
    label: { en: string; bn: string },
    value: LocalizedString,
    onChange: (next: LocalizedString) => void,
    multiline = false
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className={labelClass}>{label.en}</label>
        {multiline ? (
          <textarea
            rows={3}
            value={value.en}
            onChange={(event) => onChange({ ...value, en: event.target.value })}
            className={fieldClass}
          />
        ) : (
          <input
            type="text"
            value={value.en}
            onChange={(event) => onChange({ ...value, en: event.target.value })}
            className={fieldClass}
          />
        )}
      </div>
      <div>
        <label className={`${labelClass} font-bangla`}>{label.bn}</label>
        {multiline ? (
          <textarea
            rows={3}
            value={value.bn}
            onChange={(event) => onChange({ ...value, bn: event.target.value })}
            className={`${fieldClass} font-bangla`}
          />
        ) : (
          <input
            type="text"
            value={value.bn}
            onChange={(event) => onChange({ ...value, bn: event.target.value })}
            className={`${fieldClass} font-bangla`}
          />
        )}
      </div>
    </div>
  );

  // ---------------------------------------------------------------- gate
  if (!unlocked) {
    return (
      <div className="py-20 px-4 sm:px-6 max-w-lg mx-auto">
        <div
          className={`p-8 rounded-3xl border space-y-5 text-center ${
            theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100 shadow-[0_8px_30px_rgb(5,150,105,0.06)]'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className={`font-heading text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'ঘোষণা পপআপ এডিটর' : 'Announcement Popup Editor'}
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'স্টাফ পাসওয়ার্ড দিয়ে প্রবেশ করুন। (ডেমো পাসওয়ার্ড: bist2026)'
              : 'Enter the staff password to continue. (Demo password: bist2026)'}
          </p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && unlock()}
            placeholder={isBn ? 'স্টাফ পাসওয়ার্ড' : 'Staff password'}
            className={`${fieldClass} text-center`}
          />
          {error && <p className="text-[11px] text-rose-600 font-semibold">{error}</p>}
          <button
            onClick={unlock}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 text-slate-950 font-heading font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>{isBn ? 'প্রবেশ করুন' : 'Unlock editor'}</span>
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------ editor
  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`font-heading text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
            {isBn ? 'ঘোষণা পপআপ ব্যবস্থাপনা' : 'Announcement Popup'}
          </h1>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isBn
              ? 'নিচের তালিকা ওয়েবসাইটের নিচের-ডান কোণে দেখানো হয়। সক্রিয় পোস্ট, ক্রম এবং তারিখ নির্ধারণ করুন।'
              : 'These cards appear in the bottom-right popup on the public site. Control which are live, their order and their dates.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={previewPopup}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
              theme === 'dark' ? 'border-white/15 text-slate-200 hover:bg-white/5' : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isBn ? 'সাইটে দেখুন' : 'Preview on site'}</span>
          </button>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 hover:from-emerald-600 hover:to-yellow-500 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isBn ? 'নতুন ঘোষণা' : 'New announcement'}</span>
          </button>
        </div>
      </div>

      {uploadNote && (
        <p className={`text-[11px] font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>{uploadNote}</p>
      )}

      {/* Draft form */}
      {draft && (
        <div
          className={`p-6 rounded-3xl border space-y-5 ${
            theme === 'dark' ? 'glass-panel-dark border-emerald-500/30' : 'bg-white border-emerald-200 shadow-[0_8px_30px_rgb(5,150,105,0.08)]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className={`font-heading font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {draft.id ? (isBn ? 'ঘোষণা সম্পাদনা' : 'Edit announcement') : isBn ? 'নতুন ঘোষণা' : 'New announcement'}
            </h2>
            <button
              onClick={() => setDraft(null)}
              aria-label={isBn ? 'বাতিল' : 'Cancel'}
              className={`p-1.5 rounded-lg cursor-pointer ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {localized(
            { en: 'Title (English)', bn: 'শিরোনাম (বাংলা)' },
            draft.title,
            (next) => setDraft({ ...draft, title: next })
          )}

          {localized(
            { en: 'Short description (English)', bn: 'সংক্ষিপ্ত বিবরণ (বাংলা)' },
            draft.description,
            (next) => setDraft({ ...draft, description: next }),
            true
          )}

          {/* Image */}
          <div>
            <label className={labelClass}>{isBn ? 'ছবি (লিংক অথবা আপলোড)' : 'Image (link or upload)'}</label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={draft.image ?? ''}
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                placeholder="./images/campus-1.webp …"
                className={`${fieldClass} flex-1 min-w-[12rem]`}
              />
              <button
                onClick={() => fileInput.current?.click()}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                  theme === 'dark' ? 'border-white/15 text-slate-200 hover:bg-white/5' : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <ImagePlus className="w-3.5 h-3.5" />
                <span>{isBn ? 'আপলোড' : 'Upload'}</span>
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => onFile(event.target.files?.[0])}
              />
            </div>
            {draft.image && (
              <div className="mt-3 w-full sm:w-56 aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-200 dark:border-white/10">
                <img src={draft.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {localized(
            { en: 'Link button label (English)', bn: 'লিংক বাটনের লেখা (বাংলা)' },
            draft.linkLabel ?? { en: '', bn: '' },
            (next) => setDraft({ ...draft, linkLabel: next })
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>{isBn ? 'লিংক' : 'Link'}</label>
              <input
                type="text"
                value={draft.link ?? ''}
                onChange={(event) => setDraft({ ...draft, link: event.target.value })}
                placeholder="#/pgd  |  https://…"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{isBn ? 'শুরুর তারিখ' : 'Start date'}</label>
              <input
                type="date"
                value={draft.startDate ?? ''}
                onChange={(event) => setDraft({ ...draft, startDate: event.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{isBn ? 'শেষ তারিখ' : 'End date'}</label>
              <input
                type="date"
                value={draft.endDate ?? ''}
                onChange={(event) => setDraft({ ...draft, endDate: event.target.value })}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className={labelClass}>{isBn ? 'ধরন' : 'Category'}</label>
              <select
                value={draft.category}
                onChange={(event) =>
                  setDraft({ ...draft, category: event.target.value as AnnouncementPost['category'] })
                }
                className={fieldClass}
              >
                <option value="announcement">{isBn ? 'প্রতিষ্ঠানের ঘোষণা' : 'Institute announcement'}</option>
                <option value="sister-concern">{isBn ? 'সিস্টার কনসার্ন কোর্স' : 'Sister-concern course'}</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{isBn ? 'ক্রম' : 'Order'}</label>
              <input
                type="number"
                min={1}
                value={draft.order}
                onChange={(event) => setDraft({ ...draft, order: Number(event.target.value) || 1 })}
                className={fieldClass}
              />
            </div>
            <label className="flex items-center gap-2 py-2.5">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(event) => setDraft({ ...draft, active: event.target.checked })}
                className="w-4 h-4 accent-emerald-500"
              />
              <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                {isBn ? 'সক্রিয়' : 'Active (live on the site)'}
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={saveDraft}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-400 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isBn ? 'সংরক্ষণ করুন' : 'Save'}</span>
            </button>
            <button
              onClick={() => setDraft(null)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                theme === 'dark' ? 'border-white/15 text-slate-300' : 'border-emerald-200 text-slate-600'
              }`}
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {sorted.length === 0 && (
          <div
            className={`p-10 rounded-3xl border text-center space-y-2 ${
              theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
            }`}
          >
            <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
              {isBn ? 'কোনো ঘোষণা নেই' : 'No announcements yet'}
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {isBn
                ? '“নতুন ঘোষণা” বাটন দিয়ে প্রথম কার্ডটি যোগ করুন।'
                : 'Add the first card with “New announcement”.'}
            </p>
          </div>
        )}

        {sorted.map((post, position) => (
          <div
            key={post.id}
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center gap-4 ${
              theme === 'dark' ? 'glass-panel-dark border-white/10' : 'bg-white/95 border-emerald-100'
            }`}
          >
            <div className="w-full sm:w-32 aspect-[16/9] sm:aspect-[4/3] rounded-xl overflow-hidden bg-emerald-950/10 shrink-0">
              {post.image ? (
                <img src={post.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                  {isBn ? 'ছবি নেই' : 'No image'}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold">
                  #{post.order}
                </span>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                  {post.category === 'sister-concern'
                    ? isBn ? 'সিস্টার কনসার্ন' : 'Sister concern'
                    : isBn ? 'ঘোষণা' : 'Announcement'}
                </span>
                <span className={post.active ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                  {post.active ? (isBn ? 'সক্রিয়' : 'Active') : isBn ? 'নিষ্ক্রিয়' : 'Inactive'}
                </span>
                {(post.startDate || post.endDate) && (
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                    {post.startDate || '…'} → {post.endDate || '…'}
                  </span>
                )}
              </div>
              <h3 className={`font-heading font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-[#0b192c]'}`}>
                {isBn ? post.title.bn || post.title.en : post.title.en || post.title.bn}
              </h3>
              <p className={`text-[11px] line-clamp-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {isBn ? post.description.bn || post.description.en : post.description.en || post.description.bn}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => moveAnnouncement(post.id, 'up')}
                disabled={position === 0}
                aria-label={isBn ? 'উপরে সরান' : 'Move up'}
                className={`p-2 rounded-lg border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-emerald-200 text-slate-600'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveAnnouncement(post.id, 'down')}
                disabled={position === sorted.length - 1}
                aria-label={isBn ? 'নিচে সরান' : 'Move down'}
                className={`p-2 rounded-lg border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-emerald-200 text-slate-600'
                }`}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => startEdit(post)}
                aria-label={isBn ? 'সম্পাদনা' : 'Edit'}
                className={`p-2 rounded-lg border cursor-pointer ${
                  theme === 'dark' ? 'border-white/10 text-slate-300' : 'border-emerald-200 text-slate-600'
                }`}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteAnnouncement(post.id)}
                aria-label={isBn ? 'মুছে ফেলুন' : 'Delete'}
                className="p-2 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-500/30 dark:hover:bg-rose-500/10 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
