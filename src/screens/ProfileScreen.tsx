import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Award,
  Package,
  Layers,
  Sparkles,
  RefreshCw,
  LogOut,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, setRole, language, setLanguage, resetToDemoState, t } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAF8] text-[#0F172A] pb-24">
      <TopBar title={t('User Profile', 'उपयोगकर्ता प्रोफ़ाइल')} />

      <div className="p-4 space-y-4">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#ECFDF5] border-2 border-[#10B981]/30 flex items-center justify-center text-3xl shadow-sm shrink-0">
              {user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-lg font-black text-slate-900 truncate">
                  {user.name}
                </h2>
                <Badge variant="green" size="xs">
                  {role === 'producer' ? 'Verified Farmer' : role === 'supplier' ? 'Verified Converter' : 'Operations'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 font-semibold truncate flex items-center gap-1">
                <Building2 size={13} className="text-slate-400" />
                <span>{user.organization}</span>
              </p>

              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                <span className="truncate">{user.location}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Contact:</span>
            <span className="font-bold text-slate-800">{user.phone}</span>
          </div>
        </div>

        {/* Role Specific Details Section (Section 28) */}
        {role === 'producer' ? (
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Package size={15} className="text-[#10B981]" />
              <span>Farm & Harvest Profile</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Primary Produce:</span>
                <strong className="text-slate-900">Bananas, Tomatoes, Mangoes</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Typical Harvest Volume:</span>
                <strong className="text-slate-900">{user.typicalVolume}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Transit Corridors:</span>
                <strong className="text-slate-900">Sonipat → Azadpur Mandi, Delhi</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Packaging Goals:</span>
                <strong className="text-[#059669]">Bruise Prevention & Longer Life</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={15} className="text-[#10B981]" />
              <span>Plant & Converting Specifications</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Primary Extrusions:</span>
                <strong className="text-slate-900">PET/LDPE, BOPP Micro-perf, MAP</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Production Capacity:</span>
                <strong className="text-slate-900">{user.typicalVolume}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Standard Minimum Order:</span>
                <strong className="text-slate-900">500 kg per batch run</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Quality Certifications:</span>
                <strong className="text-[#059669]">ISO 22000, FSSAI, BRCGS</strong>
              </div>
            </div>
          </div>
        )}

        {/* Language & Preferences (Section 36) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Globe size={15} className="text-[#10B981]" />
            <span>Language & Region (भाषा चयन)</span>
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

        {/* Prototype Switch Role & Reset */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => navigate('/role-selection')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw size={15} />
            <span>Switch Role (Farmer / Supplier / Brand)</span>
          </button>

          <button
            onClick={() => {
              resetToDemoState();
              navigate('/app/home');
            }}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Reset Demo Scenario (Rajesh Kumar Banana 500kg)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
