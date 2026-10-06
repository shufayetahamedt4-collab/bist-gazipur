import React, { useMemo, useRef, useState } from 'react';
import {
  Activity as ActivityIcon,
  Plus,
  Lock,
  Unlock,
  Trash2,
  Search,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityAuthorRole, ActivityMediaKind, ActivityPost } from '../../types';

/**
 * Demo gate, mirroring AdminDashboardPage: there is no account system yet, so the
 * staff password simply reveals the composer. Anything published here lives in the
 * visitor's own browser (`bist_activity_posts`), not on a server.
 */
const STAFF_PASSWORD = 'bist2026';

/**
 * Uploaded media is inlined as a data URL, and the whole feed shares one ~5 MB
 * localStorage budget. Cap a single file well below that so a couple of photos
 * still fit; larger clips should be linked by URL instead.
 */
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

const FILTERS: { id: 'all' | ActivityMediaKind; label: string; labelBn: string }[] = [
  { id: 'all', label: 'All', labelBn: 'সব' },
  { id: 'photo', label: 'Photos', labelBn: 'ছবি' },
  { id: 'video', label: 'Videos', labelBn: 'ভিডিও' },
  { id: 'text', label: 'Posts', labelBn: 'পোস্ট' },
];

const ROLE_LABELS: Record<ActivityAuthorRole, { en: string; bn: string }> = {
  teacher: { en: 'Teacher', bn: 'শিক্ষক' },
  administration: { en: 'Administration', bn: 'প্রশাসন' },
};

const formatRelative = (createdAt: number, isBn: boolean): string => {
  const seconds = Math.max(0, Math.round((Date.now() - createdAt) / 1000));
  if (seconds < 60) return isBn ? 'এইমাত্র' : 'Just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return isBn ? `${minutes} মিনিট আগে` : `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return isBn ? `${hours} ঘণ্টা আগে` : `${hours}h ago`;
  const days = Math.round(hours / 24);
  // Beyond a week an exact date reads better than a growing day count.
  if (days < 7) return isBn ? `${days} দিন আগে` : `${days}d ago`;
  return new Date(createdAt).toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'BIST';

export const ActivityPage: React.FC = () => {
  const { language, activityPosts, addActivityPost, deleteActivityPost } = useApp();
  const isBn = language === 'bn';

  const [activeFilter, setActiveFilter] = useState<'all' | ActivityMediaKind>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Staff gate
  const [isStaff, setIsStaff] = useState(false);
  const [password, setPassword] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState<ActivityAuthorRole>('teacher');
  const [gateError, setGateError] = useState('');

  // Composer
  const [formError, setFormError] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [kind, setKind] = useState<ActivityMediaKind>('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() !== STAFF_PASSWORD) {
      setGateError(isBn ? 'পাসওয়ার্ড সঠিক নয়।' : 'That password is not right.');
      return;
    }
    setGateError('');
    setPassword('');
    setIsStaff(true);
  };

  const resetComposer = () => {
    setTitle('');
    setBody('');
    setKind('text');
    setMediaUrl('');
    setCaption('');
    setFormError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setFormError(
        isBn
          ? 'ফাইলটি অনেক বড় (সর্বোচ্চ ২ মেগাবাইট)। বড় ভিডিওর জন্য নিচে একটি লিংক ব্যবহার করুন।'
          : 'That file is too large (2 MB max). For a bigger video, paste a link instead.',
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setMediaUrl(typeof reader.result === 'string' ? reader.result : '');
      setFormError('');
    };
    reader.onerror = () =>
      setFormError(isBn ? 'ফাইলটি পড়া যায়নি।' : 'That file could not be read.');
    reader.readAsDataURL(file);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setFormError(isBn ? 'পোস্টের লেখা লিখুন।' : 'Please write something to post.');
      return;
    }
    if (kind !== 'text' && !mediaUrl.trim()) {
      setFormError(
        isBn
          ? 'ছবি বা ভিডিও যোগ করুন, অথবা ফাইল আপলোড করুন।'
          : kind === 'photo'
            ? 'Add a photo file or paste an image link.'
            : 'Add a video file or paste a video link.',
      );
      return;
    }

    addActivityPost({
      author: staffName.trim() || (isBn ? 'স্টাফ' : 'Staff'),
      authorRole: staffRole,
      title: title.trim() ? { en: title.trim(), bn: title.trim() } : undefined,
      body: { en: body.trim(), bn: body.trim() },
      kind,
      mediaUrl: kind === 'text' ? undefined : mediaUrl.trim(),
      caption: caption.trim() ? { en: caption.trim(), bn: caption.trim() } : undefined,
    });

    setActiveFilter('all');
    resetComposer();
  };

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return [...activityPosts]
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter((post) => (activeFilter === 'all' ? true : post.kind === activeFilter))
      .filter((post) => {
        if (!q) return true;
        return (
          post.body.en.toLowerCase().includes(q) ||
          post.body.bn.toLowerCase().includes(q) ||
          post.title?.en.toLowerCase().includes(q) ||
          post.title?.bn.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          post.caption?.en.toLowerCase().includes(q)
        );
      });
  }, [activityPosts, activeFilter, searchTerm]);

  const countOf = (id: 'all' | ActivityMediaKind) =>
    id === 'all' ? activityPosts.length : activityPosts.filter((p) => p.kind === id).length;

  const renderMedia = (post: ActivityPost) => {
    if (post.kind === 'text' || !post.mediaUrl) return null;
    const alt = post.caption?.en || post.body.en;

    if (post.kind === 'video') {
      return (
        <video
          src={post.mediaUrl}
          poster={post.mediaPoster}
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-[26rem] rounded-xl bg-black object-contain"
        />
      );
    }

    return (
      <img
        src={post.mediaUrl}
        alt={alt}
        loading="lazy"
        className="w-full max-h-[26rem] rounded-xl object-cover border border-slate-200 dark:border-white/10"
      />
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
          <ActivityIcon className="w-3.5 h-3.5" />
          <span>{isBn ? 'ক্যাম্পাস অ্যাক্টিভিটি' : 'Campus Activity'}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBn ? 'শিক্ষক ও প্রশাসনের অ্যাক্টিভিটি' : 'Activity from our Teachers & Administration'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isBn
            ? 'ক্যাম্পাসের ছবি, ভিডিও ও সংক্ষিপ্ত আপডেট — সরাসরি আমাদের শিক্ষক ও প্রশাসনের কাছ থেকে।'
            : 'Photographs, short videos and day-to-day updates posted by our teachers and administration.'}
        </p>
      </div>

      {/* Staff gate / composer */}
      {!isStaff ? (
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              {isBn ? 'স্টাফ হিসেবে পোস্ট করুন' : 'Post as a teacher or administrator'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isBn
              ? 'পোস্ট করতে স্টাফ পাসওয়ার্ড দিন। (ডেমো পাসওয়ার্ড: bist2026)'
              : 'Enter the staff password to publish. (Demo password: bist2026)'}
          </p>
          <form onSubmit={handleSignIn} className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isBn ? 'স্টাফ পাসওয়ার্ড' : 'Staff password'}
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>{isBn ? 'সাইন ইন' : 'Sign in'}</span>
            </button>
          </form>
          {gateError && <p className="text-[11px] text-rose-600 dark:text-rose-400">{gateError}</p>}
        </div>
      ) : (
        <form
          onSubmit={handlePublish}
          className="glass-panel p-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 space-y-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                {isBn ? 'নতুন অ্যাক্টিভিটি পোস্ট' : 'New activity post'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                resetComposer();
                setIsStaff(false);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isBn ? 'সাইন আউট' : 'Sign out'}</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {isBn ? 'আপনার নাম' : 'Your name'}
              </label>
              <input
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder={isBn ? 'যেমন: মোঃ রফিকুল ইসলাম' : 'e.g. Md. Rafiqul Islam'}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {isBn ? 'পদবি' : 'Role'}
              </label>
              <select
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value as ActivityAuthorRole)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="teacher">{isBn ? 'শিক্ষক' : 'Teacher'}</option>
                <option value="administration">{isBn ? 'প্রশাসন' : 'Administration'}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {isBn ? 'শিরোনাম (ঐচ্ছিক)' : 'Title (optional)'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isBn ? 'সংক্ষিপ্ত শিরোনাম' : 'A short headline'}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {isBn ? 'বিবরণ' : 'What would you like to share?'}
            </label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                isBn
                  ? 'ক্যাম্পাসের একটি আপডেট, ক্লাসের ছবি বা সংক্ষিপ্ত নোট লিখুন...'
                  : 'Write a campus update, a note about a class, or a short announcement...'
              }
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Media type */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'text', label: isBn ? 'শুধু লেখা' : 'Text', icon: FileText },
                { id: 'photo', label: isBn ? 'ছবি' : 'Photo', icon: ImageIcon },
                { id: 'video', label: isBn ? 'ভিডিও' : 'Video', icon: VideoIcon },
              ] as { id: ActivityMediaKind; label: string; icon: React.ElementType }[]
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setKind(option.id);
                  setFormError('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  kind === option.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <option.icon className="w-3.5 h-3.5" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {kind !== 'text' && (
            <div className="space-y-3 rounded-xl border border-dashed border-slate-300 dark:border-white/15 p-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <label className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs text-slate-700 dark:text-slate-200 font-medium flex items-center justify-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {kind === 'photo'
                      ? isBn ? 'ছবি আপলোড (২ MB)' : 'Upload photo (2 MB)'
                      : isBn ? 'ভিডিও আপলোড (২ MB)' : 'Upload video (2 MB)'}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={kind === 'photo' ? 'image/*' : 'video/*'}
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </label>
                <span className="text-[11px] text-slate-400 text-center">{isBn ? 'অথবা' : 'or'}</span>
                {/* Deliberately `type="text"`: the field accepts site-relative paths
                    like ./images/campus-1.webp, which a browser `type="url"` would reject
                    during constraint validation and block the whole submit. */}
                <input
                  type="text"
                  inputMode="url"
                  value={mediaUrl.startsWith('data:') ? '' : mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={
                    kind === 'photo' ? './images/campus-1.webp' : './videos/hero-campus-loop.mp4'
                  }
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {mediaUrl.startsWith('data:') && (
                <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <CheckCircleLabel isBn={isBn} kind={kind} />
                  <button
                    type="button"
                    onClick={() => {
                      setMediaUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-slate-500 hover:text-rose-600 underline"
                  >
                    {isBn ? 'সরান' : 'Remove'}
                  </button>
                </div>
              )}

              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={isBn ? 'ক্যাপশন (ঐচ্ছিক)' : 'Caption (optional)'}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {formError && <p className="text-[11px] text-rose-600 dark:text-rose-400">{formError}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={resetComposer}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-semibold"
            >
              {isBn ? 'মুছে ফেলুন' : 'Clear'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'পোস্ট করুন' : 'Publish post'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="glass-panel p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {isBn ? filter.labelBn : filter.label} ({countOf(filter.id)})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? 'পোস্ট খুঁজুন...' : 'Search posts...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredPosts.length === 0 && (
          <div className="glass-panel p-8 rounded-2xl text-center border border-slate-200 dark:border-white/10">
            <ActivityIcon className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isBn ? 'কোনো পোস্ট পাওয়া যায়নি।' : 'No posts to show yet.'}
            </p>
          </div>
        )}

        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="glass-panel rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-yellow-400 p-[1.5px] shrink-0">
                    <div className="w-full h-full rounded-full flex items-center justify-center text-xs font-bold bg-white dark:bg-[#0b192c] text-slate-800 dark:text-white">
                      {initialsOf(post.author)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {post.author}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                        {isBn
                          ? ROLE_LABELS[post.authorRole].bn
                          : ROLE_LABELS[post.authorRole].en}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {formatRelative(post.createdAt, isBn)}
                    </span>
                  </div>
                </div>

                {isStaff && (
                  <button
                    onClick={() => deleteActivityPost(post.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors shrink-0"
                    title={isBn ? 'পোস্ট মুছুন' : 'Delete post'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {post.title && (
                <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {isBn ? post.title.bn : post.title.en}
                </h2>
              )}

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {isBn ? post.body.bn : post.body.en}
              </p>

              {renderMedia(post)}

              {post.caption && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  {isBn ? post.caption.bn : post.caption.en}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

/** Small confirmation line shown after a file upload is inlined. */
const CheckCircleLabel: React.FC<{ isBn: boolean; kind: ActivityMediaKind }> = ({ isBn, kind }) => (
  <span>
    {isBn
      ? kind === 'photo'
        ? 'ছবিটি সংযুক্ত হয়েছে'
        : 'ভিডিওটি সংযুক্ত হয়েছে'
      : kind === 'photo'
        ? 'Photo attached'
        : 'Video attached'}
  </span>
);
