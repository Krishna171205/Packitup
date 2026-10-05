import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white flex flex-col select-none justify-between pb-6">
      {/* Top Bar with Skip */}
      <div className="px-6 pt-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#0a0f0d]">9:41</span>
        <button
          onClick={() => navigate('/role-selection')}
          className="text-xs font-semibold text-[#6b8076] hover:text-[#0a0f0d] cursor-pointer px-2 py-1"
        >
          Skip
        </button>
      </div>

      {/* Center Visual: Fresh produce in compostable packaging with floating leaves */}
      <div className="px-6 flex flex-col items-center justify-center pt-2">
        <div className="w-full max-w-xs aspect-4/3 rounded-3xl overflow-hidden relative shadow-xs border border-[#e2ebe6] bg-[#f9fcfb] flex items-center justify-center p-3">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
            alt="Intelligent Packaging Container"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Subtle floating leaf badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#0f4028] shadow-xs border border-[#c5d8ce] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2da464]" />
            <span>100% Bio-based</span>
          </div>
        </div>
      </div>

      {/* Copy & Content */}
      <div className="px-6 text-center space-y-2.5">
        <h2 className="text-2xl font-extrabold text-[#0a0f0d] leading-snug tracking-tight">
          Intelligent Packaging<br />for a Healthier Food Chain
        </h2>
        <p className="text-xs text-[#6b8076] max-w-xs mx-auto leading-relaxed">
          Get the best material, design and suppliers — powered by AI.
        </p>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-1.5 pt-3">
          <div className="w-5 h-1.5 bg-[#0f4028] rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#c5d8ce] rounded-full" />
        </div>
      </div>

      {/* Action CTA */}
      <div className="px-6 pt-2">
        <button
          onClick={() => navigate('/role-selection')}
          className="w-full h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
        >
          <span>Next</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
