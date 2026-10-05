import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert, TrendingDown, Leaf, FileCheck,
  ChevronRight, ArrowUpRight, BarChart2, Package, Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';

export const PackhouseHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, analyticsData, t } = useApp();

  return (
    <div className="screen">
      <TopBar />

      <div className="px-4 space-y-4 pt-2 pb-6">
        {/* Header Hero */}
        <div className="card p-5 bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
                <span>📦</span> {user.organization || 'FreshRoots Agritech & Packhouse'}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                {t(`Enterprise Control: ${user.name.split(' ')[0]}`, `पैकहाउस नियंत्रण: ${user.name.split(' ')[0]}`)}
              </h2>
              <p className="text-xs text-amber-200 mt-1">
                {t('Managing packaging specifications, quality compliance & bulk contracts.', 'पैकेजिंग विनिर्देशों, गुणवत्ता अनुपालन और अनुबंधों का प्रबंधन।')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🏬
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-amber-300">Packhouse Throughput</span>
            <span className="font-bold text-emerald-400">45,000 Retail Packs / week</span>
          </div>
        </div>

        {/* Compliance Alert Card */}
        <div className="card p-4 border border-amber-300 bg-amber-50 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  {t('Mandatory Compliance Due', 'अनिवार्य अनुपालन')}
                </span>
                <span className="text-xs font-bold text-amber-800 font-mono">14 Days Left</span>
              </div>
              <h4 className="text-sm font-extrabold text-amber-950 mt-1">
                PWM 2022 Extended Producer Responsibility (EPR) Annual Filing Due
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Central Pollution Control Board (CPCB) portal requires category I & III recycled polymer usage declaration.
              </p>
              <button
                onClick={() => navigate('/app/packhouse/compliance')}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/90 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                {t('Generate EPR Audit Package', 'EPR ऑडिट पैकेज बनाएं')} <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Summary Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3.5 border-l-4 border-l-emerald-500">
            <span className="text-[11px] font-bold text-gray-500">{t('Avg Spoilage Rate', 'औसत खराबी दर')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">{analyticsData.averageSpoilageRate}%</span>
              <span className="chip chip-green text-[10px]">↓{analyticsData.spoilageReductionPercent}%</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Down from 22.4% before AI</p>
          </div>

          <div className="card p-3.5 border-l-4 border-l-blue-500">
            <span className="text-[11px] font-bold text-gray-500">{t('AI Barrier Accuracy', 'AI बाधा सटीकता')}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-gray-900">{analyticsData.aiAccuracyScore}%</span>
              <span className="chip chip-blue text-[10px]">High Conf</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Validated on 12k field cycles</p>
          </div>
        </div>

        {/* Multi-Project Overview (4 commodities) */}
        <div>
          <div className="section-header">
            <span className="section-title">{t('Multi-Commodity Active Pipelines', 'सक्रिय कमोडिटी पाइपलाइन')}</span>
            <button onClick={() => navigate('/app/packhouse/analytics')} className="section-link">
              {t('View Metrics', 'एनालिटिक्स')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { name: 'Banana (Cavendish)', emoji: '🍌', cost: '₹2.10/kg', shelf: '14 Days', status: 'Optimal' },
              { name: 'Mango (Alphonso)', emoji: '🥭', cost: '₹14.80/kg', shelf: '26 Days', status: 'APEDA Export' },
              { name: 'Tomato Hybrid', emoji: '🍅', cost: '₹1.85/kg', shelf: '16 Days', status: 'Anti-Fog' },
              { name: 'Grapes (Thompson)', emoji: '🍇', cost: '₹4.20/kg', shelf: '21 Days', status: 'Chilled MAP' },
            ].map((comm) => (
              <div
                key={comm.name}
                onClick={() => navigate('/app/packhouse/analytics')}
                className="card card-hover p-3 border border-gray-100 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{comm.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{comm.name}</p>
                    <span className="text-[10px] font-medium text-emerald-600">{comm.status}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between text-[11px]">
                  <span className="text-gray-500">Cost: <strong>{comm.cost}</strong></span>
                  <span className="text-blue-700 font-bold">{comm.shelf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Footprint Widget */}
        <div className="card p-4 border border-emerald-200 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/40">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <Leaf size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {t('Packaging Carbon Score (Monthly)', 'मासिक कार्बन स्कोर')}
                </h4>
                <p className="text-[11px] text-gray-500">Sustainable mono-material transitions</p>
              </div>
            </div>
            <span className="chip chip-green text-xs font-black">
              -{analyticsData.carbonReductionPercent}% CO₂e
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-700">PACKITUP Optimized: {analyticsData.carbonFootprintKgCO2} kg CO₂eq</span>
              <span className="text-gray-400 line-through">Legacy: {analyticsData.conventionalCarbonKgCO2} kg</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '69%', background: 'linear-gradient(90deg, #10B981, #059669)' }} />
            </div>
          </div>
        </div>

        {/* Supplier Contracts & Renewals */}
        <div className="card p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-blue-600" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {t('Active Bulk Contracts (3)', 'सक्रिय अनुबंध (3)')}
              </h4>
            </div>
            <button onClick={() => navigate('/app/packhouse/analytics')} className="text-xs text-blue-600 font-bold">
              Manage
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">GreenPack Films Pvt Ltd</p>
                <p className="text-[10px] text-gray-400">PET/LDPE 50,000 units/mo · Renewal: 15 Nov 2026</p>
              </div>
              <span className="chip chip-green text-[10px]">Active</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">Nova Laminates & Pouches</p>
                <p className="text-[10px] text-gray-400">EVOH Trilayer Export Pouch · Renewal: 20 Dec 2026</p>
              </div>
              <span className="chip chip-green text-[10px]">Active</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">EcoFilm Solutions</p>
                <p className="text-[10px] text-gray-400">Home-compostable PLA/PBAT · Renewal: 28 Oct 2026</p>
              </div>
              <span className="chip chip-amber text-[10px]">Renew Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
