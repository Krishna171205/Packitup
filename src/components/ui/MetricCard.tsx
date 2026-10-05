import React from 'react';
import clsx from 'clsx';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  accentColor?: 'green' | 'blue' | 'amber' | 'red';
  trend?: { value: string; positive: boolean };
  onClick?: () => void;
}

const accentClasses: Record<string, { bg: string; text: string }> = {
  green: { bg: 'bg-green-50',  text: 'text-green-600' },
  blue:  { bg: 'bg-blue-50',   text: 'text-blue-600'  },
  amber: { bg: 'bg-amber-50',  text: 'text-amber-600' },
  red:   { bg: 'bg-red-50',    text: 'text-red-600'   },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label, value, subtext, icon, accentColor = 'green', trend, onClick,
}) => {
  const accent = accentClasses[accentColor] || accentClasses.green;

  return (
    <div
      onClick={onClick}
      className={clsx('card p-3.5 flex flex-col gap-2', onClick && 'card-hover')}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500">{label}</span>
        {icon && (
          <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center', accent.bg, accent.text)}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <span className="text-xl font-extrabold text-gray-900 leading-none">{value}</span>
        {trend && (
          <span className={clsx('text-[11px] font-bold', trend.positive ? 'text-green-600' : 'text-red-500')}>
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-[11px] text-gray-400 leading-tight">{subtext}</p>
      )}
    </div>
  );
};
