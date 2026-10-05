import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, ChevronDown, Check } from 'lucide-react';

const SUPPLIERS = [
  { id: 'greenpack', name: 'GreenPack Solutions', location: 'Noida, UP', tags: 'PLA, PBAT, Paper', rating: 4.8 },
  { id: 'ecowrap', name: 'EcoWrap Industries', location: 'Delhi NCR', tags: 'Compostable Film', rating: 4.6 },
  { id: 'biopack', name: 'BioPack India', location: 'Gurgaon', tags: 'PLA, Starch Blend', rating: 4.5 },
  { id: 'sustainpack', name: 'SustainPack', location: 'Faridabad', tags: 'Paper, Moulded Pulp', rating: 4.4 },
];

export const SuppliersListScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
      <div>
        {/* Top Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#e2ebe6]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#0a0f0d] cursor-pointer border border-[#e2ebe6]"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-extrabold text-[#0a0f0d]">Suppliers</h1>
          </div>

          <button className="w-9 h-9 rounded-xl bg-[#f2f6f4] flex items-center justify-center text-[#6b8076]">
            <Search size={17} />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-[#f2f6f4]">
          {['Location', 'Material', 'Min. Rating'].map((f) => (
            <button
              key={f}
              className="px-3 py-1.5 rounded-full bg-[#f2f6f4] hover:bg-[#e2ebe6] text-xs font-semibold text-[#3d5347] flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <span>{f}</span>
              <ChevronDown size={13} />
            </button>
          ))}
        </div>

        {/* Supplier Cards List */}
        <div className="p-5 space-y-3">
          {SUPPLIERS.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(`/app/suppliers/${s.id}`)}
              className="p-3.5 rounded-2xl border border-[#e2ebe6] hover:border-[#c5d8ce] bg-white flex items-center justify-between gap-3 cursor-pointer shadow-2xs transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Geometric Green Supplier Badge */}
                <div className="w-11 h-11 rounded-xl bg-[#edf9f3] text-[#0f4028] border border-[#c5d8ce] flex items-center justify-center font-extrabold text-sm">
                  {s.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-extrabold text-xs text-[#0a0f0d]">{s.name}</h3>
                  <p className="text-[11px] text-[#6b8076]">{s.location}</p>
                  <p className="text-[10px] text-[#94aaa0] mt-0.5">{s.tags}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-[#0a0f0d]">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{s.rating}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/app/projects/proj-tomato-1/rfq');
                  }}
                  className="px-3 py-1 rounded-full border border-[#0f4028] text-[#0f4028] text-[11px] font-bold hover:bg-[#edf9f3] transition-colors"
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
