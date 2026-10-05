import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check, ArrowRight, Sparkles, Clock, ShieldCheck,
  Scale, Leaf, ChevronRight, TrendingUp, Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { AI_RECOMMENDATION_RULES } from '../data/mockData';

export const OptionsComparisonScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedTier, setSelectedTier, currentCommodity, activeProjectId, t } = useApp();
  const projId = id || activeProjectId;

  const commodityKey = (currentCommodity?.id || 'banana').toLowerCase();
  const rules = AI_RECOMMENDATION_RULES[commodityKey] || AI_RECOMMENDATION_RULES['banana'];

  const [selectedOptIndex, setSelectedOptIndex] = useState<number>(1); // Default to balanced/recommended

  const isCostPlan = selectedTier === 'cost';
  const isShelfLifePlan = selectedTier === 'shelf_life';
  const isSmartPlan = selectedTier === 'smart';

  const costOptions = rules.costPlan.options;
  const shelfLifeOptions = rules.shelfLifePlan.options;
  const smartOptions = rules.smartPlan.options;
  const paretoPoints = rules.smartPlan.paretoFrontier;

  return (
    <div className="screen pb-24">
      <TopBar title="Compare Packaging Options" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Tier Tabs Switcher */}
        <div className="flex bg-gray-200/80 p-1 rounded-2xl">
          <button
            onClick={() => { setSelectedTier('cost'); setSelectedOptIndex(0); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              isCostPlan ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💚 Cost Plan
          </button>
          <button
            onClick={() => { setSelectedTier('shelf_life'); setSelectedOptIndex(0); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              isShelfLifePlan ? 'bg-white text-blue-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💙 Shelf-Life
          </button>
          <button
            onClick={() => { setSelectedTier('smart'); setSelectedOptIndex(1); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              isSmartPlan ? 'bg-white text-amber-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💛 Smart Plan
          </button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* SMART PLAN: PARETO FRONTIER VISUALIZATION                        */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {isSmartPlan && (
          <div className="card p-4 border border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                  Pareto Optimality Curve
                </span>
                <h3 className="text-sm font-black text-gray-900">
                  {t('Cost vs. Shelf Life Trade-off', 'लागत बनाम शेल्फ लाइफ संतुलन')}
                </h3>
              </div>
              <span className="chip chip-amber text-[10px]">AI Frontier</span>
            </div>

            {/* Pareto Plot Visual (SVG) */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white relative">
              <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                <span>▲ Y: Shelf Life (Days)</span>
                <span>X: Cost Per Pack (₹) ▶</span>
              </div>

              {/* 2-Axis Plot Canvas */}
              <div className="relative h-40 w-full border-l-2 border-b-2 border-slate-700 pl-2 pb-2">
                {/* SVG Curve */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  {/* Grid lines */}
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#334155" strokeDasharray="3 3" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#334155" strokeDasharray="3 3" />

                  {/* Pareto curve smooth path */}
                  <path
                    d="M 20 120 Q 90 90, 160 55 T 320 20"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Interactive Points on curve */}
                {/* Point 1: Budget */}
                <div
                  onClick={() => setSelectedOptIndex(0)}
                  className={`absolute left-[15%] bottom-[20%] -translate-x-1/2 translate-y-1/2 cursor-pointer transition-transform ${
                    selectedOptIndex === 0 ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg ${
                    selectedOptIndex === 0 ? 'bg-green-500 ring-4 ring-green-500/40 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    1
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 block text-center whitespace-nowrap mt-1">
                    ₹0.85 · 9d
                  </span>
                </div>

                {/* Point 2: Balanced (Recommended) */}
                <div
                  onClick={() => setSelectedOptIndex(1)}
                  className={`absolute left-[50%] bottom-[60%] -translate-x-1/2 translate-y-1/2 cursor-pointer transition-transform ${
                    selectedOptIndex === 1 ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-lg ${
                    selectedOptIndex === 1 ? 'bg-amber-500 ring-4 ring-amber-500/50 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    ★
                  </div>
                  <span className="text-[9px] font-black text-amber-400 block text-center whitespace-nowrap mt-1">
                    ₹2.10 · 14d
                  </span>
                </div>

                {/* Point 3: Premium */}
                <div
                  onClick={() => setSelectedOptIndex(2)}
                  className={`absolute left-[85%] bottom-[88%] -translate-x-1/2 translate-y-1/2 cursor-pointer transition-transform ${
                    selectedOptIndex === 2 ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg ${
                    selectedOptIndex === 2 ? 'bg-blue-500 ring-4 ring-blue-500/40 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    3
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 block text-center whitespace-nowrap mt-1">
                    ₹4.80 · 18d
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-2 text-center leading-relaxed">
                {t(
                  'These 3 Pareto-optimal options cannot be improved simultaneously — pick your business trade-off.',
                  'इन 3 विकल्पों को एक साथ बेहतर नहीं किया जा सकता — अपना संतुलन चुनें।'
                )}
              </p>
            </div>

            {/* Smart Plan Cards */}
            <div className="space-y-2.5 pt-1">
              {smartOptions.map((opt, idx) => {
                const isSelected = selectedOptIndex === idx;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setSelectedOptIndex(idx)}
                    className={`card p-3.5 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-gray-900">{opt.label}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${opt.badgeColor}`}>
                            {opt.tag}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-800 mt-0.5">{opt.material}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">{opt.description}</p>

                    <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-100 font-mono">
                      <span className="text-gray-500">
                        Cost: <strong className="text-gray-900 text-sm">₹{opt.cost.toFixed(2)}</strong> / bag
                      </span>
                      <span className="text-emerald-700 font-bold">
                        {opt.shelfLife} Days Shelf Life
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* COST PLAN: 3 OPTIONS RANKED BY PRICE (CHEAPEST FIRST)            */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {isCostPlan && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">{t('Cost Plan Options', 'कॉस्ट प्लान विकल्प')}</h3>
                <p className="text-xs text-gray-500">{t('Ranked by lowest cost per bag', 'न्यूनतम लागत के अनुसार')}</p>
              </div>
              <span className="chip chip-green text-[10px]">Budget First</span>
            </div>

            <div className="space-y-2.5">
              {costOptions.map((opt, idx) => {
                const isSelected = selectedOptIndex === idx;
                return (
                  <div
                    key={opt.title}
                    onClick={() => setSelectedOptIndex(idx)}
                    className={`card p-4 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-gray-900">{opt.title}</h4>
                          {opt.tag && (
                            <span className="chip chip-green text-[9px] font-bold">{opt.tag}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">{opt.material}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-100 font-mono">
                      <span className="text-gray-500">
                        Price: <strong className="text-emerald-700 text-sm">₹{opt.cost.toFixed(2)}</strong> / bag
                      </span>
                      <span className="text-gray-700 font-bold">
                        {opt.shelfLife} Days Hold
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* SHELF-LIFE PLAN: 3 OPTIONS RANKED BY SHELF LIFE (BEST FIRST)     */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        {isShelfLifePlan && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">{t('Shelf-Life Plan Options', 'शेल्फ-लाइफ विकल्प')}</h3>
                <p className="text-xs text-gray-500">{t('Ranked by longest shelf life days', 'अधिकतम शेल्फ लाइफ के अनुसार')}</p>
              </div>
              <span className="chip chip-blue text-[10px]">Maximum Days</span>
            </div>

            <div className="space-y-2.5">
              {shelfLifeOptions.map((opt, idx) => {
                const isSelected = selectedOptIndex === idx;
                return (
                  <div
                    key={opt.title}
                    onClick={() => setSelectedOptIndex(idx)}
                    className={`card p-4 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-gray-900">{opt.title}</h4>
                          {opt.tag && (
                            <span className="chip chip-blue text-[9px] font-bold">{opt.tag}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">{opt.material}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-100 font-mono">
                      <span className="text-gray-500">
                        Cost: <strong className="text-gray-900 text-sm">₹{opt.cost.toFixed(2)}</strong> / bag
                      </span>
                      <span className="text-blue-700 font-black text-sm">
                        {opt.shelfLife} Days (Maximum)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Proceed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3.5 z-40 max-w-[430px] mx-auto flex gap-2">
        <button
          onClick={() => navigate(`/app/projects/${projId}/blueprint`)}
          className="btn-outline flex-1 py-3 text-xs font-bold"
        >
          {t('View Blueprint', 'ब्लूप्रिंट देखें')}
        </button>

        <button
          onClick={() => {
            if (isSmartPlan) {
              navigate(`/app/projects/${projId}/bidding`);
            } else {
              navigate(`/app/projects/${projId}/multi-rfq`);
            }
          }}
          className="btn-brand flex-1 py-3 text-xs font-bold"
        >
          <span>{isSmartPlan ? t('Go to Live Auction', 'लाइव नीलामी में जाएं') : t('Send RFQ to Converters', 'कन्वर्टर्स को RFQ भेजें')}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
