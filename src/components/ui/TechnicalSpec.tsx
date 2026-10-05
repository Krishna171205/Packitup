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
    <div className="bg-slate-50/80 hover:bg-slate-50 rounded-xl p-3 border border-slate-200/80 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          {icon && <span className="text-[#10B981]">{icon}</span>}
          <span>{label}</span>
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            title="What does this mean?"
          >
            <HelpCircle size={13} />
          </button>
        </div>
        {isPrototypeVal && (
          <span className="text-[9px] bg-slate-200/70 text-slate-600 px-1.5 py-0.5 rounded font-medium">
            Est.
          </span>
        )}
      </div>

      <div className="text-sm font-bold text-slate-900 mb-0.5">
        {value} {unit && <span className="text-xs font-normal text-slate-500">{unit}</span>}
      </div>

      <p className="text-[11px] text-slate-500 leading-snug">
        {simpleExplanation}
      </p>

      {showTooltip && (
        <div className="mt-2 p-2 bg-[#0F172A] text-white text-[11px] rounded-lg shadow-lg flex items-start gap-1.5 animate-fadeIn">
          <Info size={14} className="text-[#34D399] shrink-0 mt-0.5" />
          <span>
            <strong>Farmer Guide:</strong> {simpleExplanation}. Scientific calculation simulated for testing purposes.
          </span>
        </div>
      )}
    </div>
  );
};
