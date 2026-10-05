import React from 'react';

interface ComparisonBarProps {
  label: string;
  value: string | number;
  percentage: number;
  subtext?: string;
  comparisonNote?: string;
  color?: 'green' | 'blue' | 'amber' | 'red';
  size?: 'sm' | 'md';
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  label,
  value,
  percentage,
  subtext,
  comparisonNote,
  color = 'green',
  size = 'md',
}) => {
  const barColors = {
    green: 'bg-[#0f4028]',
    blue:  'bg-blue-600',
    amber: 'bg-amber-600',
    red:   'bg-red-600',
  };

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex justify-between items-baseline text-xs">
        <span className="font-semibold text-[#1a2620]">{label}</span>
        <span className="font-bold text-[#0a0f0d]">{value}</span>
      </div>
      <div className={`w-full bg-[#f2f6f4] rounded-full overflow-hidden border border-[#e2ebe6] ${size === 'sm' ? 'h-2' : 'h-2.5'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      {(subtext || comparisonNote) && (
        <div className="flex justify-between text-[11px] text-[#6b8076]">
          <span>{subtext}</span>
          {comparisonNote && <span className="text-[#0f4028] font-bold">{comparisonNote}</span>}
        </div>
      )}
    </div>
  );
};
