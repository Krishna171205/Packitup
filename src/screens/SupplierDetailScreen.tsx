import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';

export const SupplierDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'About' | 'Products' | 'Reviews'>('About');

  const materials = [
    { name: 'PLA Film', img: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200' },
    { name: 'PBAT Film', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Moulded Pulp', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header & Visual */}
      <div>
        <div className="flex items-center gap-4 mb-4 pt-2">
          <button
            onClick={() => navigate('/app/suppliers')}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Hero Photo */}
        <div className="w-full h-44 rounded-[28px] overflow-hidden bg-gray-50 border border-gray-100 mb-5 relative shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
            alt="Packaging Facility"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Supplier Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0f4028] text-white flex items-center justify-center font-black text-xl">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                GreenPack Solutions
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Noida, UP
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span>4.8</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 gap-8 mb-5">
          {(['About', 'Products', 'Reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'text-[#0f4028] border-b-2 border-[#0f4028]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-[#f8fafc] rounded-2xl text-center border border-gray-50">
            <span className="text-base font-extrabold text-gray-900 block">5+</span>
            <span className="text-[11px] font-semibold text-gray-400">Years</span>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-2xl text-center border border-gray-50">
            <span className="text-base font-extrabold text-gray-900 block">200+</span>
            <span className="text-[11px] font-semibold text-gray-400">Clients</span>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-2xl text-center border border-gray-50">
            <span className="text-base font-extrabold text-gray-900 block">4.8</span>
            <span className="text-[11px] font-semibold text-gray-400">Rating</span>
          </div>
        </div>

        {/* Key Materials */}
        <div>
          <h3 className="text-xs font-bold text-gray-700 mb-3">
            Key Materials
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {materials.map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-2 p-2 bg-[#f8fafc] rounded-2xl border border-gray-50">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex gap-3 pb-4 pt-6">
        <button
          onClick={() => navigate('/app/messages')}
          className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
        >
          <MessageSquare size={20} />
        </button>

        <button
          onClick={() => navigate('/app/projects/proj-tomato-1/rfq')}
          className="flex-1 py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
};
