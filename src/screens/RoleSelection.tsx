import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sprout, Factory, Store, Check } from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

const ROLES = [
  {
    id: 'farmer' as UserRole,
    title: 'Producer / Farmer',
    subtitle: 'Find the right packaging',
    icon: Sprout,
  },
  {
    id: 'converter' as UserRole,
    title: 'Supplier',
    subtitle: 'Get orders & quotes',
    icon: Factory,
  },
  {
    id: 'packhouse' as UserRole,
    title: 'Brand / Retailer',
    subtitle: 'Source & manage supply',
    icon: Store,
  },
];

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [selected, setSelected] = useState<UserRole>('farmer');

  const handleContinue = () => {
    setRole(selected);
    if (selected === 'converter') navigate('/app/converter/home');
    else if (selected === 'packhouse') navigate('/app/packhouse/home');
    else navigate('/app/home');
  };

  return (
    <div className="min-h-full bg-white flex flex-col select-none justify-between pb-6">
      {/* Top Header */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#0a0f0d] cursor-pointer border border-[#e2ebe6]"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0a0f0d] tracking-tight mb-2">
          Choose Your Role
        </h1>
        <p className="text-xs text-[#6b8076]">
          We customize your tools and marketplace access based on your business role.
        </p>
      </div>

      {/* Role Option Cards */}
      <div className="px-6 space-y-3.5 my-auto">
        {ROLES.map((r) => {
          const isSelected = selected === r.id;
          const Icon = r.icon;

          return (
            <div
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                isSelected
                  ? 'border-[#0f4028] bg-[#edf9f3] ring-1 ring-[#0f4028]/20 shadow-xs'
                  : 'border-[#e2ebe6] bg-white hover:border-[#c5d8ce]'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-[#0f4028] text-white' : 'bg-[#f2f6f4] text-[#0f4028] border border-[#e2ebe6]'
                }`}
              >
                <Icon size={22} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm text-[#0a0f0d]">{r.title}</h3>
                <p className="text-xs text-[#6b8076] mt-0.5">{r.subtitle}</p>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'border-[#0f4028] bg-[#0f4028] text-white'
                    : 'border-[#c5d8ce] bg-transparent'
                }`}
              >
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="px-6 pt-4">
        <button
          onClick={handleContinue}
          className="w-full h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
