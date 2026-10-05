import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, Globe, ArrowRight, ChevronRight, LayoutDashboard } from 'lucide-react';
import { useApp, UserRole, ServiceTier } from '../context/AppContext';

export const ControlPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    role,
    setRole,
    selectedTier,
    setSelectedTier,
    language,
    setLanguage,
    resetToDemoState,
    activeProjectId,
  } = useApp();

  const rolesList: { id: UserRole; label: string; icon: string }[] = [
    { id: 'farmer', label: 'Farmer / FPO', icon: '🌾' },
    { id: 'converter', label: 'Converter', icon: '🏭' },
    { id: 'material_producer', label: 'Material Producer', icon: '🌿' },
    { id: 'packhouse', label: 'Packhouse / Brand', icon: '🏢' },
    { id: 'transporter', label: 'Transporter', icon: '🚚' },
  ];

  const tiersList: { id: ServiceTier; label: string; color: string }[] = [
    { id: 'cost', label: 'Cost Plan (Free)', color: 'text-emerald-400' },
    { id: 'shelf_life', label: 'Shelf-Life Plan', color: 'text-blue-400' },
    { id: 'smart', label: 'Smart Plan (AI-Auction)', color: 'text-amber-400' },
  ];

  const handleStepJump = (path: string, targetRole: UserRole) => {
    if (role !== targetRole) {
      setRole(targetRole);
    }
    navigate(path);
  };

  const quickLinks = [
    { title: 'Project Blueprint', path: `/app/projects/${activeProjectId || 'proj-banana-1'}/blueprint`, r: 'farmer' },
    { title: 'AI Options Compare', path: `/app/projects/${activeProjectId || 'proj-banana-1'}/options`, r: 'farmer' },
    { title: 'Multi-RFQ Bidding', path: `/app/projects/${activeProjectId || 'proj-banana-1'}/bidding`, r: 'farmer' },
    { title: 'Packhouse Analytics', path: '/app/packhouse/analytics', r: 'packhouse' },
    { title: 'Traceability QR', path: `/app/projects/${activeProjectId || 'proj-banana-1'}/qr`, r: 'farmer' },
    { title: 'Transport Check', path: '/app/transporter/check', r: 'transporter' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">System Control Panel</h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">Master Demo & Simulation Controller</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <Globe size={16} className="text-emerald-400" />
              <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
            </button>
            <button
              onClick={() => {
                resetToDemoState();
                navigate('/app/home');
              }}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <RefreshCw size={16} />
              <span>Reset State</span>
            </button>
            <button
              onClick={() => navigate('/app')}
              className="flex items-center gap-2 text-sm font-bold text-emerald-950 bg-emerald-400 px-6 py-2 rounded-full transition-all hover:bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              <span>Enter App</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Role Config */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold">1</span>
              Global Active Role
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rolesList.map((r) => {
                const isCur = role === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`py-3.5 px-4 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all cursor-pointer border ${
                      isCur
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/50 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Tier Config */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold">2</span>
              AI Engine Service Tier
            </h2>
            <div className="flex flex-col gap-3">
              {tiersList.map((tItem) => {
                const isCur = selectedTier === tItem.id;
                return (
                  <button
                    key={tItem.id}
                    onClick={() => setSelectedTier(tItem.id)}
                    className={`py-3.5 px-5 rounded-2xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                      isCur
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm ' + tItem.color
                        : 'bg-slate-800/80 text-slate-400 border-slate-700/50 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold text-sm">
                      {tItem.label}
                    </span>
                    {isCur && <div className="w-2.5 h-2.5 rounded-full bg-current shadow-[0_0_10px_currentColor]"></div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Jump Links */}
        <div className="space-y-4 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <span className="bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold">3</span>
            Quick Access Deep Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleStepJump(link.path, link.r as UserRole)}
                className="bg-slate-800/80 hover:bg-emerald-950/40 hover:border-emerald-600/60 border border-slate-700/50 p-4 rounded-2xl text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 mb-4">{link.title}</span>
                <div className="flex justify-between items-center text-slate-400 group-hover:text-emerald-400">
                  <span className="text-[10px] uppercase tracking-wider font-bold">Role: {link.r}</span>
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Return to App Button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => navigate('/app/home')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <LayoutDashboard size={16} />
            <span>Go to Home Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
