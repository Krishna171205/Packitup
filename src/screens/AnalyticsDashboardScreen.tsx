import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export const AnalyticsDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-24 select-none">
      <div>
        {/* Top Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#e2ebe6]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/home')}
              className="w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#0a0f0d] cursor-pointer border border-[#e2ebe6]"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-extrabold text-[#0a0f0d]">Insights</h1>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e2ebe6] text-xs font-semibold text-[#0a0f0d] bg-white">
            <span>Last 6 Months</span>
            <ChevronDown size={13} className="text-[#94aaa0]" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* 2 Metric Sparkline Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: +65% Shelf Life */}
            <div className="p-3.5 bg-[#f9fcfb] rounded-2xl border border-[#e2ebe6] space-y-2">
              <div>
                <span className="text-xl font-extrabold text-[#0f4028]">+65%</span>
                <span className="block text-[11px] font-semibold text-[#6b8076]">Shelf Life Improvement</span>
              </div>
              {/* Upward Wave Sparkline */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30" fill="none">
                <path
                  d="M0 26 C20 22, 35 25, 50 14 C65 6, 80 10, 100 2"
                  stroke="#0f4028"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Card 2: -32% CO2 Impact */}
            <div className="p-3.5 bg-[#f9fcfb] rounded-2xl border border-[#e2ebe6] space-y-2">
              <div>
                <span className="text-xl font-extrabold text-[#0f4028]">-32%</span>
                <span className="block text-[11px] font-semibold text-[#6b8076]">CO₂ Impact</span>
              </div>
              {/* Downward Sparkline */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30" fill="none">
                <path
                  d="M0 4 C20 6, 35 12, 50 18 C65 24, 80 20, 100 26"
                  stroke="#0f4028"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Donut Chart: Material Usage */}
          <div className="p-4 bg-[#f9fcfb] rounded-2xl border border-[#e2ebe6] space-y-4">
            <h3 className="font-extrabold text-xs text-[#0a0f0d]">Material Usage</h3>

            <div className="flex items-center gap-6">
              {/* SVG Donut */}
              <div className="w-28 h-28 relative flex items-center justify-center flex-shrink-0">
                <svg width="112" height="112" viewBox="0 0 42 42" className="rotate-[-90deg]">
                  {/* Background ring */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2ebe6" strokeWidth="6" />
                  {/* 1. Biodegradable 45% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#0f4028"
                    strokeWidth="6"
                    strokeDasharray="45 55"
                    strokeDashoffset="0"
                  />
                  {/* 2. Recycled 25% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#165c3a"
                    strokeWidth="6"
                    strokeDasharray="25 75"
                    strokeDashoffset="-45"
                  />
                  {/* 3. Compostable 20% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#52c988"
                    strokeWidth="6"
                    strokeDasharray="20 80"
                    strokeDashoffset="-70"
                  />
                  {/* 4. Others 10% */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#c2d0cc"
                    strokeWidth="6"
                    strokeDasharray="10 90"
                    strokeDashoffset="-90"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0f4028]" />
                    <span className="text-[#3d5347]">Biodegradable</span>
                  </div>
                  <span className="font-extrabold text-[#0a0f0d]">45%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#165c3a]" />
                    <span className="text-[#3d5347]">Recycled</span>
                  </div>
                  <span className="font-extrabold text-[#0a0f0d]">25%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52c988]" />
                    <span className="text-[#3d5347]">Compostable</span>
                  </div>
                  <span className="font-extrabold text-[#0a0f0d]">20%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c2d0cc]" />
                    <span className="text-[#3d5347]">Others</span>
                  </div>
                  <span className="font-extrabold text-[#0a0f0d]">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
