import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Bell,
  Shield,
  RefreshCw,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/ui/Card';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole, language, setLanguage, resetToDemoState, t } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAF8] text-[#0F172A] pb-24">
      <TopBar title={t('Settings', 'सेटिंग्स')} showBack />

      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Preferences & Controls
          </h2>
          <p className="text-xs text-slate-500">
            Configure mobile application settings and prototype simulator controls.
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Globe size={15} className="text-[#10B981]" />
            <span>Display Language (भाषा)</span>
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer ${
                language === 'en'
                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#059669]'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer ${
                language === 'hi'
                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#059669]'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {/* Prototype Persona Switcher */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={15} className="text-[#10B981]" />
            <span>Active Persona Role</span>
          </h3>

          <div className="space-y-2">
            {[
              { id: 'producer', label: 'Farmer / Food Producer (Rajesh Kumar)', icon: '🌾' },
              { id: 'supplier', label: 'Packaging Converter (GreenPack)', icon: '🏭' },
              { id: 'brand', label: 'Food Brand / Retail Operations', icon: '🏬' },
            ].map((pRole) => (
              <button
                key={pRole.id}
                onClick={() => setRole(pRole.id as any)}
                className={`w-full p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  role === pRole.id
                    ? 'border-[#10B981] bg-[#ECFDF5] text-[#059669]'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{pRole.icon}</span>
                  <span>{pRole.label}</span>
                </span>
                {role === pRole.id && <span className="text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Reset State */}
        <div className="pt-2">
          <button
            onClick={() => {
              resetToDemoState();
              navigate('/app/home');
            }}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw size={14} />
            <span>Reset All Prototype Data & Timelines</span>
          </button>
        </div>
      </div>
    </div>
  );
};
