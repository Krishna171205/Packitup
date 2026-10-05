import React from 'react';

interface ComparisonBarProps {
  label: string;
  valueText: string;
  percentage: number; // 0 - 100
  color?: 'green' | 'blue' | 'amber' | 'slate';
  subtext?: string;
  comparisonNote?: string;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  label,
  valueText,
  percentage,
  color = 'green',
  subtext,
  comparisonNote,
}) => {
  const barColors = {
    green: 'bg-gradient-to-r from-[#10B981] to-[#34D399]',
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400',
    slate: 'bg-gradient-to-r from-slate-600 to-slate-400',
  };

  const clampedPercentage = Math.min(100, Math.max(5, percentage));

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="font-bold text-slate-900">{valueText}</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      {(subtext || comparisonNote) && (
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>{subtext}</span>
          {comparisonNote && <span className="text-[#059669] font-medium">{comparisonNote}</span>}
        </div>
      )}
    </div>
  );
};
