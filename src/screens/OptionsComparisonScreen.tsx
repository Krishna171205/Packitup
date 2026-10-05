import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check, ArrowRight, Sparkles, Clock, ShieldCheck,
  Scale, Leaf, ChevronRight, TrendingUp, Info, Coins, Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { AI_RECOMMENDATION_RULES } from '../data/mockData';

export const OptionsComparisonScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { selectedTier, setSelectedTier, currentCommodity, activeProjectId } = useApp();
  const projId = id || activeProjectId;

  const commodityKey = (currentCommodity?.id || 'banana').toLowerCase();
  const rules = AI_RECOMMENDATION_RULES[commodityKey] || AI_RECOMMENDATION_RULES['banana'];

  const [selectedOptIndex, setSelectedOptIndex] = useState<number>(1); // Default to balanced/recommended

  const isCostPlan = selectedTier === 'cost';
  const isShelfLifePlan = selectedTier === 'shelf_life';
  const isSmartPlan = selectedTier === 'smart' || (!isCostPlan && !isShelfLifePlan);

  const currentPlan = isCostPlan 
    ? rules.costPlan 
    : isShelfLifePlan 
    ? rules.shelfLifePlan 
    : rules.smartPlan;

  const options = currentPlan.options;

  return (
    <div className="screen pb-24 bg-[#f9fcfb]">
      <TopBar title="Compare Packaging Options" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Tier Tabs Switcher */}
        <div className="flex bg-[#f2f6f4] p-1 rounded-2xl border border-[#e2ebe6]">
          <button
            onClick={() => setSelectedTier('cost')}
            className={`flex-1 py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isCostPlan 
                ? 'bg-[#0f4028] text-white shadow-xs' 
                : 'text-[#6b8076] hover:text-[#0a0f0d]'
            }`}
          >
            <Coins size={13} />
            <span>Cost First</span>
          </button>

          <button
            onClick={() => setSelectedTier('shelf_life')}
            className={`flex-1 py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isShelfLifePlan 
                ? 'bg-[#0f4028] text-white shadow-xs' 
                : 'text-[#6b8076] hover:text-[#0a0f0d]'
            }`}
          >
            <Clock size={13} />
            <span>Max Shelf-Life</span>
          </button>

          <button
            onClick={() => setSelectedTier('smart')}
            className={`flex-1 py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isSmartPlan 
                ? 'bg-[#0f4028] text-white shadow-xs' 
                : 'text-[#6b8076] hover:text-[#0a0f0d]'
            }`}
          >
            <Sparkles size={13} />
            <span>Smart Plan</span>
          </button>
        </div>

        {/* Strategy Description Banner */}
        <div className="p-3.5 bg-white rounded-2xl border border-[#e2ebe6] shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0f4028] uppercase tracking-wider mb-1">
            <ShieldCheck size={14} />
            <span>{currentPlan.title}</span>
          </div>
          <p className="text-xs text-[#3d5347] leading-relaxed">
            {currentPlan.description}
          </p>
        </div>

        {/* Options Cards */}
        <div className="space-y-3">
          {options.map((opt: any, idx: number) => {
            const isSelected = selectedOptIndex === idx;

            return (
              <div
                key={opt.id || idx}
                onClick={() => setSelectedOptIndex(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#0f4028] ring-2 ring-[#0f4028]/10 shadow-sm'
                    : 'bg-white/70 border-[#e2ebe6] hover:border-[#c5d8ce]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#0f4028] text-white' : 'bg-[#f2f6f4] text-[#6b8076]'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#0a0f0d]">{opt.name}</h3>
                      <p className="text-[11px] text-[#6b8076]">{opt.material} · {opt.thickness}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold text-[#0a0f0d]">₹{opt.costPerUnit}</span>
                    <span className="block text-[10px] text-[#94aaa0]">/ packaging unit</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#f2f6f4]">
                  <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                    <span className="block text-[9.5px] uppercase font-bold text-[#6b8076]">Shelf-Life</span>
                    <span className="font-extrabold text-xs text-[#0a0f0d] mt-0.5 block">{opt.shelfLife}</span>
                  </div>
                  <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                    <span className="block text-[9.5px] uppercase font-bold text-[#6b8076]">Barrier Score</span>
                    <span className="font-extrabold text-xs text-[#0f4028] mt-0.5 block">{opt.barrierRating}/10</span>
                  </div>
                  <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
                    <span className="block text-[9.5px] uppercase font-bold text-[#6b8076]">Eco Index</span>
                    <span className="font-extrabold text-xs text-[#165c3a] mt-0.5 block">{opt.ecoScore || 'Class A'}</span>
                  </div>
                </div>

                {/* Highlights tag */}
                {opt.recommended && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-[#0f4028] bg-[#edf9f3] px-2.5 py-1 rounded-lg w-fit border border-[#c5d8ce]">
                    <Star size={11} className="fill-[#0f4028]" />
                    <span>Algorithm Recommended for Fresh Produce Transit</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => navigate(`/app/projects/${projId}/quotes`)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <span>Proceed to Compare Supplier Quotes</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
