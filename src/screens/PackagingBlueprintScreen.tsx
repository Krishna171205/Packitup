import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Layers, Shield, Leaf, Check } from 'lucide-react';

export const PackagingBlueprintScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'Overview' | 'Properties' | 'Cost' | 'Impact'>('Overview');
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
      <div>
        {/* Top Hero Banner */}
        <div className="relative w-full h-52 bg-[#e2ebe6]">
          <img
            src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600"
            alt="PLA + PBAT Film Roll"
            className="w-full h-full object-cover"
          />
          {/* Back button */}
          <button
            onClick={() => navigate('/app/projects/new')}
            className="absolute top-5 left-5 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0a0f0d] shadow-xs cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Card Overlay Content */}
        <div className="px-6 pt-4 space-y-4">
          {/* Title & Sustainability Badge */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-[#0a0f0d] tracking-tight">PLA + PBAT Film</h1>
              <p className="text-xs text-[#6b8076] mt-0.5">Biodegradable packaging film</p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-[#edf9f3] border border-[#c5d8ce] text-[#0f4028] text-xs font-bold flex items-center gap-1">
              <Leaf size={12} />
              <span>92/100</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e2ebe6]">
            {(['Overview', 'Properties', 'Cost', 'Impact'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 pb-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  tab === t ? 'border-[#0f4028] text-[#0f4028]' : 'border-transparent text-[#94aaa0]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab Description */}
          <p className="text-xs text-[#3d5347] leading-relaxed">
            Biodegradable film with good moisture barrier, ideal for fresh fruits and vegetables.
          </p>

          {/* Key Specs List */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#edf9f3] text-[#0f4028] flex items-center justify-center">
                <Clock size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-[#6b8076]">Shelf Life</span>
                <span className="block text-xs font-bold text-[#0a0f0d]">15–18 days</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#edf9f3] text-[#0f4028] flex items-center justify-center">
                <Layers size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-[#6b8076]">Thickness</span>
                <span className="block text-xs font-bold text-[#0a0f0d]">25–50 micron</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#edf9f3] text-[#0f4028] flex items-center justify-center">
                <Shield size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-[#6b8076]">Barrier Properties</span>
                <span className="block text-xs font-bold text-[#0a0f0d]">Good (O₂, moisture)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#edf9f3] text-[#0f4028] flex items-center justify-center">
                <Leaf size={16} />
              </div>
              <div>
                <span className="block text-[10px] text-[#6b8076]">Biodegradable</span>
                <span className="block text-xs font-bold text-[#0a0f0d]">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="px-6 pt-4 flex gap-3">
        <button
          onClick={() => navigate('/app/suppliers')}
          className="flex-1 h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <span>Add to RFQ</span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className="w-24 h-13 rounded-2xl border border-[#e2ebe6] hover:bg-[#f9fcfb] text-[#0a0f0d] font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          {saved && <Check size={14} className="text-[#0f4028]" />}
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};
