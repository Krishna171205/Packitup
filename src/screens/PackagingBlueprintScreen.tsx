import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Leaf, Clock, Layers, ShieldCheck, CheckCircle2, Bookmark } from 'lucide-react';

export const PackagingBlueprintScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Properties' | 'Cost' | 'Impact'>('Overview');
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => navigate('/app/projects/new')}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full h-48 rounded-[28px] overflow-hidden bg-gray-50 border border-gray-100 mb-5 relative shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=500"
            alt="PLA + PBAT Film"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Badge */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            PLA + PBAT Film
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f1f7f4] text-[#165c3a] rounded-full text-xs font-bold">
            <span>🌱</span>
            <span>92/100</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 gap-6 mb-5">
          {(['Overview', 'Properties', 'Cost', 'Impact'] as const).map((tab) => (
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

        {/* Tab Content */}
        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
          Biodegradable film with good moisture barrier, ideal for fresh fruits and vegetables. Manufactured from renewable corn starch and synthetic co-polyester.
        </p>

        {/* Specs List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Shelf Life</span>
              <span className="text-sm font-bold text-gray-900">15-18 days</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Thickness</span>
              <span className="text-sm font-bold text-gray-900">25-50 micron</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Barrier Properties</span>
              <span className="text-sm font-bold text-gray-900">Good (O₂, moisture)</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Biodegradable</span>
              <span className="text-sm font-bold text-gray-900">Yes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex gap-3 pb-4 pt-6">
        <button
          onClick={() => navigate(`/app/projects/${id || 'proj-tomato-1'}/rfq`)}
          className="flex-1 py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98"
        >
          Add to RFQ
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`px-6 py-4 rounded-full border text-sm font-bold transition-all cursor-pointer ${
            saved
              ? 'bg-[#f1f7f4] text-[#0f4028] border-[#0f4028]'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  );
};
