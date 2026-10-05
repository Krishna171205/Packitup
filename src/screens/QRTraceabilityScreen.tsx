import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, QrCode } from 'lucide-react';

export const QRTraceabilityScreen: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
            <h1 className="text-lg font-extrabold text-[#0a0f0d]">Product Traceability</h1>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Hero Tomatoes Image with Embedded QR Code Badge */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border border-[#e2ebe6] bg-[#f9fcfb] relative flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600"
              alt="Fresh Tomatoes with QR Batch Sticker"
              className="w-full h-full object-cover"
            />
            {/* Center QR Code Sticker Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-2xl p-2.5 shadow-lg border border-[#c5d8ce] flex flex-col items-center justify-center">
                <QrCode size={56} className="text-[#0f4028]" />
                <span className="text-[8px] font-mono font-bold text-[#0a0f0d] mt-1">#PU2456T9</span>
              </div>
            </div>
          </div>

          {/* Batch Details Card */}
          <div className="space-y-2.5 pt-1">
            <div className="flex justify-between items-center py-2 border-b border-[#f2f6f4] text-xs">
              <span className="text-[#6b8076]">Batch ID</span>
              <span className="font-extrabold text-[#0a0f0d]">#PU2456T9</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#f2f6f4] text-xs">
              <span className="text-[#6b8076]">Material</span>
              <span className="font-extrabold text-[#0a0f0d]">PLA + PBAT</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#f2f6f4] text-xs">
              <span className="text-[#6b8076]">Manufactured</span>
              <span className="font-extrabold text-[#0a0f0d]">12 Sep 2026</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#f2f6f4] text-xs">
              <span className="text-[#6b8076]">Expiry</span>
              <span className="font-extrabold text-[#0a0f0d]">27 Sep 2026</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#f2f6f4] text-xs">
              <span className="text-[#6b8076]">Certifications</span>
              <span className="font-extrabold text-[#0f4028]">TDS, SDS, Compostable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pt-4">
        <button
          onClick={() => setModalOpen(true)}
          className="w-full h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center shadow-xs cursor-pointer transition-all"
        >
          View Full Report
        </button>
      </div>

      {/* Full Audit Report Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 animate-fade-up">
            <h3 className="font-extrabold text-base text-[#0a0f0d]">Batch Compliance Passport</h3>
            <p className="text-xs text-[#6b8076] leading-relaxed">
              Certified by CIPET and FSSAI under testing standard EN 13432. All chemical migration thresholds verified below 10 mg/dm².
            </p>
            <div className="p-3 bg-[#edf9f3] rounded-xl border border-[#c5d8ce] text-xs font-bold text-[#0f4028] flex items-center gap-2">
              <Check size={16} />
              <span>Full Farm-to-Fork Chain Verified</span>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full h-11 rounded-xl bg-[#0f4028] text-white font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
