import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, ArrowDownRight, ArrowLeft } from 'lucide-react';

export const AnalyticsDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/home')}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Insights
            </h1>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white">
            <span>Last 6 Months</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>

        {/* 2 Metric Sparkline Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Card 1: Shelf Life */}
          <div className="p-4 rounded-[24px] bg-[#f8fafc] border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#0f4028]">
                <span className="text-xl font-black">+65%</span>
                <ArrowUpRight size={16} />
              </div>
              <p className="text-[11px] font-semibold text-gray-500 mt-1 leading-snug">
                Shelf Life Improvement
              </p>
            </div>
            {/* Sparkline curve */}
            <div className="h-12 w-full mt-3">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <path
                  d="M0 35 Q 25 32, 50 18 T 100 5"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 35 Q 25 32, 50 18 T 100 5 L 100 40 L 0 40 Z"
                  fill="url(#greenGrad1)"
                  opacity="0.15"
                />
                <defs>
                  <linearGradient id="greenGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Card 2: CO2 Impact */}
          <div className="p-4 rounded-[24px] bg-[#f8fafc] border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#0f4028]">
                <span className="text-xl font-black">-32%</span>
                <ArrowDownRight size={16} />
              </div>
              <p className="text-[11px] font-semibold text-gray-500 mt-1 leading-snug">
                CO₂ Impact
              </p>
            </div>
            {/* Sparkline curve */}
            <div className="h-12 w-full mt-3">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <path
                  d="M0 8 Q 30 12, 60 26 T 100 35"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 8 Q 30 12, 60 26 T 100 35 L 100 40 L 0 40 Z"
                  fill="url(#greenGrad2)"
                  opacity="0.15"
                />
                <defs>
                  <linearGradient id="greenGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Material Usage Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900">
            Material Usage
          </h2>

          <div className="p-5 rounded-[24px] bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
            {/* Donut Chart SVG */}
            <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <path
                  className="text-gray-100"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Biodegradable 45% */}
                <path
                  stroke="#0f4028" strokeDasharray="45, 100" strokeWidth="4.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Recycled 25% */}
                <path
                  stroke="#16a34a" strokeDasharray="25, 100" strokeDashoffset="-45" strokeWidth="4.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Compostable 20% */}
                <path
                  stroke="#86efac" strokeDasharray="20, 100" strokeDashoffset="-70" strokeWidth="4.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Others 10% */}
                <path
                  stroke="#cbd5e1" strokeDasharray="10, 100" strokeDashoffset="-90" strokeWidth="4.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0f4028]"></span>
                  <span className="text-gray-600 font-medium">Biodegradable</span>
                </div>
                <span className="font-bold text-gray-900">45%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span>
                  <span className="text-gray-600 font-medium">Recycled</span>
                </div>
                <span className="font-bold text-gray-900">25%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]"></span>
                  <span className="text-gray-600 font-medium">Compostable</span>
                </div>
                <span className="font-bold text-gray-900">20%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="text-gray-600 font-medium">Others</span>
                </div>
                <span className="font-bold text-gray-900">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
