import React from 'react';
import { Scale, Coins, Clock, Leaf, Zap } from 'lucide-react';

export type FilterOption = 'balanced' | 'cost' | 'shelflife' | 'sustainability' | 'speed';

interface FilterBarProps {
  selected: FilterOption;
  onChange: (filter: FilterOption) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ selected, onChange, className = '' }) => {
  const options: { id: FilterOption; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'balanced', label: 'Balanced', icon: Scale },
    { id: 'cost', label: 'Lowest Cost', icon: Coins },
    { id: 'shelflife', label: 'Longest Life', icon: Clock },
    { id: 'sustainability', label: 'Eco-Friendly', icon: Leaf },
    { id: 'speed', label: 'Fastest Dispatch', icon: Zap },
  ];

  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5 ${className}`}>
      {options.map((opt) => {
        const isActive = selected === opt.id;
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-180 cursor-pointer ${
              isActive
                ? 'bg-[#0f4028] text-white shadow-xs'
                : 'bg-white text-[#3d5347] border border-[#e2ebe6] hover:border-[#c5d8ce] hover:bg-[#edf9f3]'
            }`}
          >
            <Icon size={13} className={isActive ? 'text-[#a2e6bf]' : 'text-[#6b8076]'} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
