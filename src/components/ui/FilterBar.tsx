import React from 'react';

export type FilterOption = 'balanced' | 'cost' | 'shelflife' | 'sustainability' | 'speed';

interface FilterBarProps {
  selected: FilterOption;
  onChange: (filter: FilterOption) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ selected, onChange, className = '' }) => {
  const options: { id: FilterOption; label: string; icon: string }[] = [
    { id: 'balanced', label: 'Balanced', icon: '⚖️' },
    { id: 'cost', label: 'Lowest Cost', icon: '💰' },
    { id: 'shelflife', label: 'Longest Life', icon: '⏳' },
    { id: 'sustainability', label: 'Eco-Friendly', icon: '🌱' },
    { id: 'speed', label: 'Fastest Dispatch', icon: '⚡' },
  ];

  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5 ${className}`}>
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#0F172A] text-white shadow-sm ring-2 ring-[#0F172A]/20 scale-100'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
