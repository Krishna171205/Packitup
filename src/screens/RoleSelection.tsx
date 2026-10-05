import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, Factory, Store, Sparkles } from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: typeof Box;
}

const ROLES: RoleOption[] = [
  {
    id: 'farmer',
    title: 'Producer / Farmer',
    subtitle: 'Find the right packaging',
    icon: Box,
  },
  {
    id: 'converter',
    title: 'Supplier',
    subtitle: 'Get orders & quotes',
    icon: Factory,
  },
  {
    id: 'packhouse',
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
    if (selected === 'converter') {
      navigate('/app/converter/home');
    } else if (selected === 'packhouse') {
      navigate('/app/packhouse/home');
    } else {
      navigate('/app/home');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-4 mb-6 pt-2">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
          Choose Your Role
        </h1>

        {/* Roles List */}
        <div className="space-y-4">
          {ROLES.map((r) => {
            const isSelected = selected === r.id;
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`flex items-center gap-4 p-5 rounded-[22px] border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0f4028] bg-[#f1f7f4]/40 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#0f4028] text-white'
                      : 'bg-[#f1f7f4] text-[#0f4028]'
                  }`}
                >
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">
                    {r.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {r.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="pb-4">
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-base transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
