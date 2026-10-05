import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, QrCode, Tag, Layers, Calendar, Clock, Award
} from 'lucide-react';

export const QRTraceabilityScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-4 mb-4 pt-2">
          <button
            onClick={() => navigate('/app/home')}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-5">
          Product Traceability
        </h1>

        {/* Hero Image Card with QR Code */}
        <div className="relative w-full h-52 rounded-[28px] overflow-hidden mb-6 shadow-sm border border-gray-100 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500"
            alt="Farm Produce Batch"
            className="w-full h-full object-cover"
          />
          {/* Transparent dark veil */}
          <div className="absolute inset-0 bg-black/25"></div>

          {/* Centered QR Code Box */}
          <div className="relative z-10 p-3 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
            {/* Real SVG QR pattern */}
            <div className="w-24 h-24 bg-white flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />

                <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />

                {/* Random micro QR pixels */}
                <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                <rect x="55" y="5" width="8" height="10" fill="currentColor" />
                <rect x="35" y="40" width="25" height="10" fill="currentColor" />
                <rect x="70" y="40" width="15" height="15" fill="currentColor" />
                <rect x="40" y="65" width="15" height="25" fill="currentColor" />
                <rect x="65" y="70" width="25" height="10" fill="currentColor" />
                <rect x="75" y="85" width="15" height="10" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Traceability Metadata List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Tag size={17} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Batch ID</span>
              <span className="text-sm font-bold text-gray-900">#PU2456T9</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Layers size={17} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Material</span>
              <span className="text-sm font-bold text-gray-900">PLA + PBAT</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Calendar size={17} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Manufactured</span>
              <span className="text-sm font-bold text-gray-900">12 Sep 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Clock size={17} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Expiry</span>
              <span className="text-sm font-bold text-gray-900">27 Sep 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center shrink-0">
              <Award size={17} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block">Certifications</span>
              <span className="text-sm font-bold text-gray-900">TDS, SDS, Compostable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="pb-4 pt-6">
        <button
          onClick={() => navigate('/app/packhouse/analytics')}
          className="w-full py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-base transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98"
        >
          View Full Report
        </button>
      </div>
    </div>
  );
};
