import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Plus,
  Trash2,
  Users,
  Bell,
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { language, applications, noticesList, addNotice, deleteNotice } = useApp();
  const isBn = language === 'bn';

  // Simple demo security gate (password: bist2026 or toggle demo unlock)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'notices'>('applications');
  const [filterQuery, setFilterQuery] = useState('');

  // Notice form state
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'examinations' | 'admissions' | 'academic' | 'holidays'>('admissions');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // CSV export handler
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No applications to export.');
      return;
    }

    const headers = [
      'Reference Number',
      'Full Name',
      'Phone',
      'Email',
      'Program Choice',
      'Shift',
      'Quota',
      'SSC GPA',
      'HSC GPA',
      'Submission Date',
      'Status',
    ];

    const rows = applications.map((app) => [
      `"${app.referenceNumber}"`,
      `"${app.fullName}"`,
      `"${app.phone}"`,
      `"${app.email}"`,
      `"${app.programChoice.toUpperCase()}"`,
      `"${app.shift}"`,
      `"${app.quota}"`,
      `"${app.sscGpa}"`,
      `"${app.hscGpa}"`,
      `"${app.submissionDate}"`,
      `"${app.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BIST_Admissions_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) {
      alert('Please fill out notice title and description.');
      return;
    }

    addNotice({
      title: { en: newNoticeTitle, bn: newNoticeTitle },
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: newNoticeCategory,
      fileType: 'pdf',
      fileSize: '450 KB',
      isNew: true,
      content: { en: newNoticeContent, bn: newNoticeContent },
    });

    setNewNoticeTitle('');
    setNewNoticeContent('');
    setShowNoticeModal(false);
  };

  const filteredApps = applications.filter((app) => {
    const q = filterQuery.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      app.referenceNumber.toLowerCase().includes(q) ||
      app.programChoice.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Management Console</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            BIST Admissions & Content Control
          </h1>
          <p className="text-xs text-slate-400">
            Monitor real-time admission leads, export student records to CSV, and publish urgent circulars.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Leads to CSV</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 max-w-sm">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'notices'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Manage Notices ({noticesList.length})</span>
        </button>
      </div>

      {/* TAB 1: Applications Lead Capture Table */}
      {activeTab === 'applications' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search applicant name, phone, ref..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredApps.length} student leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-black/40 text-slate-400 uppercase font-mono text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Tracking Ref</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">GPA (SSC/HSC)</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                      {app.referenceNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{app.fullName}</div>
                      <div className="text-[11px] text-slate-500">{app.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400">
                      <a href={`tel:${app.phone}`} className="hover:underline">
                        {app.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4 font-bold uppercase text-amber-300">
                      {app.programChoice}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {app.sscGpa} / {app.hscGpa}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {app.submissionDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 capitalize">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Manage Notices */}
      {activeTab === 'notices' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-white">
              Circulars & Official Exam Notices
            </h3>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Notice</span>
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {noticesList.map((notice) => (
              <div key={notice.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                      {notice.category}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-white line-clamp-1">
                    {notice.title.en}
                  </h4>
                </div>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors shrink-0"
                  title="Delete circular"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Publish Notice */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0f24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5">
            <h3 className="font-heading font-bold text-lg text-white">
              Publish Official Academic Circular
            </h3>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Notice Title *</label>
                <input
                  type="text"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="e.g. Schedule for 4th Semester Mid-term Examinations..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Category</label>
                <select
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white"
                >
                  <option value="admissions">Admissions</option>
                  <option value="examinations">Examinations</option>
                  <option value="academic">Academic Circular</option>
                  <option value="holidays">Holidays & Recess</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Notice Content / Instructions *</label>
                <textarea
                  rows={4}
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="Type the detailed instructions for students and faculty..."
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow-md"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
