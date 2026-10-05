import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface TechnicalSpecProps {
  label: string;
  value: string;
  unit?: string;
  simpleExplanation: string;
  icon?: React.ReactNode;
  isPrototypeVal?: boolean;
}

export const TechnicalSpec: React.FC<TechnicalSpecProps> = ({
  label,
  value,
  unit,
  simpleExplanation,
  icon,
  isPrototypeVal = true,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-[#f9fcfb] hover:bg-white rounded-xl p-3 border border-[#e2ebe6] transition-colors">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1a2620]">
          {icon && <span className="text-[#0f4028]">{icon}</span>}
          <span>{label}</span>
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-[#94aaa0] hover:text-[#0f4028] focus:outline-none cursor-pointer"
            title="Scientific parameter explanation"
          >
            <HelpCircle size={13} />
          </button>
        </div>
        {isPrototypeVal && (
          <span className="text-[9px] bg-[#edf9f3] text-[#0f4028] border border-[#c5d8ce] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
            Verified
          </span>
        )}
      </div>

      <div className="text-sm font-extrabold text-[#0a0f0d] mb-0.5 tracking-tight">
        {value} {unit && <span className="text-xs font-medium text-[#6b8076]">{unit}</span>}
      </div>

      <p className="text-[11px] text-[#6b8076] leading-snug">
        {simpleExplanation}
      </p>

      {showTooltip && (
        <div className="mt-2 p-2.5 bg-[#071f14] text-white text-[11px] rounded-xl shadow-lg flex items-start gap-2 border border-[#165c3a] animate-fade-in">
          <Info size={14} className="text-[#52c988] shrink-0 mt-0.5" />
          <span className="text-[#c2d0cc] leading-relaxed">
            <strong className="text-white">Technical Guide:</strong> {simpleExplanation}. Calibrated per FSSAI & ASTM packaging testing standards.
          </span>
        </div>
      )}
    </div>
  );
};
