import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Star, ArrowLeft } from 'lucide-react';

interface SupplierItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  materials: string;
  logoColor: string;
  logoLetter: string;
}

const SUPPLIERS: SupplierItem[] = [
  {
    id: 'greenpack',
    name: 'GreenPack Solutions',
    location: 'Noida, UP',
    rating: 4.8,
    materials: 'PLA, PBAT, Paper',
    logoColor: '#0f4028',
    logoLetter: 'G',
  },
  {
    id: 'ecowrap',
    name: 'EcoWrap Industries',
    location: 'Delhi NCR',
    rating: 4.6,
    materials: 'Compostable Film',
    logoColor: '#165c3a',
    logoLetter: 'E',
  },
  {
    id: 'biopack',
    name: 'BioPack India',
    location: 'Gurgaon',
    rating: 4.5,
    materials: 'PLA, Starch Blend',
    logoColor: '#0d9488',
    logoLetter: 'B',
  },
  {
    id: 'sustainpack',
    name: 'SustainPack',
    location: 'Faridabad',
    rating: 4.4,
    materials: 'Paper, Moulded Pulp',
    logoColor: '#047857',
    logoLetter: 'S',
  },
];

export const SuppliersListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/home')}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Suppliers
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2.5 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white">
            <span>Location</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white">
            <span>Material</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white">
            <span>Min. Rating</span>
          </button>
        </div>

        {/* Supplier Cards List */}
        <div className="space-y-3.5">
          {SUPPLIERS.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/app/suppliers/${s.id}`)}
              className="p-4 rounded-[22px] border border-gray-100 hover:border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-sm"
                  style={{ backgroundColor: s.logoColor }}
                >
                  {s.logoLetter}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    {s.location}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">
                    {s.materials}
                  </p>
                </div>
              </div>

              {/* Right Rating & Action */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span>{s.rating}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/projects/proj-tomato-1/rfq`);
                  }}
                  className="px-3.5 py-1.5 bg-[#f1f7f4] hover:bg-[#e2efe8] text-[#0f4028] text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
