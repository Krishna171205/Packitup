import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, RefreshCw, Globe, ChevronDown, Layers,
  ArrowRight, ShieldCheck, X, Flame, BarChart3, QrCode,
  Truck, Sliders, Check
} from 'lucide-react';
import { useApp, UserRole, ServiceTier } from '../context/AppContext';

export const SimulationControls: React.FC = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const rolesList: { id: UserRole; label: string; icon: string }[] = [
    { id: 'farmer', label: 'Farmer / FPO', icon: '🌾' },
    { id: 'converter', label: 'Converter', icon: '🏭' },
    { id: 'material_producer', label: 'Material Producer', icon: '🧪' },
    { id: 'packhouse', label: 'Packhouse / Brand', icon: '📦' },
    { id: 'transporter', label: 'Transporter', icon: '🚛' },
  ];

  const tiersList: { id: ServiceTier; label: string; color: string }[] = [
    { id: 'cost', label: 'Cost Plan (Free)', color: 'text-emerald-400' },
    { id: 'shelf_life', label: 'Shelf-Life Plan', color: 'text-blue-400' },
    { id: 'smart', label: 'Smart Plan (AI-Auction)', color: 'text-amber-400' },
  ];

  const screenSections = [
    {
      title: '🏠 Role Home Dashboards',
      items: [
        { label: '🌾 Farmer Home', path: '/app/home', role: 'farmer' as UserRole },
        { label: '🏭 Converter Home', path: '/app/converter/home', role: 'converter' as UserRole },
        { label: '🧪 Material Producer Home', path: '/app/material/home', role: 'material_producer' as UserRole },
        { label: '📦 Packhouse Home', path: '/app/packhouse/home', role: 'packhouse' as UserRole },
        { label: '🚛 Transporter Home', path: '/app/transporter/home', role: 'transporter' as UserRole },
      ],
    },
    {
      title: '🔬 AI Blueprint & Sizing',
      items: [
        { label: 'Role Selection Screen', path: '/role-selection', role: 'farmer' as UserRole },
        { label: '5-Step Food Science Wizard', path: '/app/projects/new', role: 'farmer' as UserRole },
        { label: 'AI Packaging Blueprint', path: `/app/projects/${activeProjectId}/blueprint`, role: 'farmer' as UserRole },
        { label: 'Options & Pareto Frontier', path: `/app/projects/${activeProjectId}/options`, role: 'farmer' as UserRole },
      ],
    },
    {
      title: '⚡ Marketplace & Live Auctions',
      items: [
        { label: 'Multi-Party RFQ Broadcast', path: `/app/projects/${activeProjectId}/multi-rfq`, role: 'farmer' as UserRole },
        { label: '🔴 Live Bidding Auction Room', path: `/app/projects/${activeProjectId}/bidding`, role: 'farmer' as UserRole },
        { label: 'Converter RFQ Management', path: '/app/converter/rfqs', role: 'converter' as UserRole },
        { label: 'Material Producer Catalog', path: '/app/material/catalog', role: 'material_producer' as UserRole },
      ],
    },
    {
      title: '📊 Enterprise, QR & Logistics',
      items: [
        { label: 'Enterprise Analytics Dashboard', path: '/app/packhouse/analytics', role: 'packhouse' as UserRole },
        { label: '📱 QR Batch Traceability', path: `/app/projects/${activeProjectId}/qr`, role: 'farmer' as UserRole },
        { label: 'Post-Harvest Flywheel Feedback', path: `/app/projects/${activeProjectId}/performance`, role: 'farmer' as UserRole },
        { label: '🚛 Transit Compatibility Tool', path: '/app/transporter/check', role: 'transporter' as UserRole },
      ],
    },
  ];

  const handleStepJump = (path: string, targetRole: UserRole) => {
    if (role !== targetRole) {
      setRole(targetRole);
    }
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Top Demo Trigger Bar */}
      <div className="bg-slate-950 text-white px-3 py-1.5 flex items-center justify-between text-[11px] shadow-sm border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-white transition-colors cursor-pointer bg-slate-800/90 hover:bg-slate-800 px-2 py-0.5 rounded-full"
          >
            <Sparkles size={12} className="animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
            <span>Judge Demo Suite</span>
            <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Role Cycle */}
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-slate-400 hidden xs:inline">Role:</span>
            <button
              onClick={() => {
                const currentIndex = rolesList.findIndex((r) => r.id === role);
                const nextIndex = (currentIndex + 1) % rolesList.length;
                setRole(rolesList[nextIndex].id);
              }}
              className="font-bold text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1"
            >
              <span>{rolesList.find((r) => r.id === role)?.icon || '🌾'}</span>
              <span>{rolesList.find((r) => r.id === role)?.label || 'Farmer'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800/80 px-2 py-0.5 rounded-full cursor-pointer transition-colors"
          >
            <Globe size={11} className="text-emerald-400" />
            <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={() => {
              resetToDemoState();
              navigate('/app/home');
              setIsOpen(false);
            }}
            title="Reset to Farmer - Banana Scenario"
            className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800/80 px-2 py-0.5 rounded cursor-pointer"
          >
            <RefreshCw size={11} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Expanded Modal / Dropdown Navigator */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center p-3 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 w-full max-w-md my-4 text-white shadow-2xl space-y-4 animate-fade-up">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">SIH Judge Demo Navigator</h3>
                  <p className="text-[10px] text-slate-400">Jump directly into any stakeholder journey</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* 1. View As Role Switcher */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Switch Active Stakeholder Role:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {rolesList.map((r) => {
                  const isCur = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isCur
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span className="truncate">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Service Tier Switcher */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                2. Demo AI Service Tier:
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {tiersList.map((tItem) => {
                  const isCur = selectedTier === tItem.id;
                  return (
                    <button
                      key={tItem.id}
                      onClick={() => setSelectedTier(tItem.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                        isCur
                          ? 'border-amber-400 bg-amber-500/20 text-white shadow-sm'
                          : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {tItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Screen Sections Grid */}
            <div className="space-y-3 pt-1 border-t border-slate-800 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
              {screenSections.map((sec) => (
                <div key={sec.title} className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">
                    {sec.title}
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {sec.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleStepJump(item.path, item.role)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-between text-left transition-colors cursor-pointer group"
                      >
                        <span className="group-hover:text-emerald-400 transition-colors">
                          {item.label}
                        </span>
                        <ArrowRight size={12} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  resetToDemoState();
                  navigate('/app/home');
                  setIsOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Reset to Farmer - Banana Scenario (Clean State)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
