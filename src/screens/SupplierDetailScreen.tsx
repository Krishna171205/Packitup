import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';

export const SupplierDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState<'About' | 'Products' | 'Reviews'>('About');

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
      <div>
        {/* Top Hero Banner */}
        <div className="relative w-full h-48 bg-[#e2ebe6]">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
            alt="GreenPack Solutions Packaging Facility"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0a0f0d] shadow-xs cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Content Card Overlay */}
        <div className="px-6 pt-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0f4028] text-white flex items-center justify-center font-extrabold text-base">
              GP
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#0a0f0d]">GreenPack Solutions</h1>
              <div className="flex items-center gap-2 text-xs text-[#6b8076] mt-0.5">
                <span>Noida, UP</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 font-bold text-[#0a0f0d]">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  4.8
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e2ebe6]">
            {(['About', 'Products', 'Reviews'] as const).map((t) => (
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

          {/* 3 Stat Boxes */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
              <span className="block text-sm font-extrabold text-[#0a0f0d]">5+</span>
              <span className="block text-[10px] text-[#6b8076]">Years</span>
            </div>
            <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
              <span className="block text-sm font-extrabold text-[#0a0f0d]">200+</span>
              <span className="block text-[10px] text-[#6b8076]">Clients</span>
            </div>
            <div className="p-3 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center">
              <span className="block text-sm font-extrabold text-[#0a0f0d]">4.8</span>
              <span className="block text-[10px] text-[#6b8076]">Rating</span>
            </div>
          </div>

          {/* Key Materials Thumbnails */}
          <div>
            <h4 className="text-xs font-extrabold text-[#0a0f0d] mb-2.5">Key Materials</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center space-y-1.5">
                <div className="w-full h-14 rounded-lg bg-white overflow-hidden border border-[#e2ebe6]">
                  <img
                    src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200"
                    alt="PLA Film"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block text-[10px] font-bold text-[#0a0f0d]">PLA Film</span>
              </div>

              <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center space-y-1.5">
                <div className="w-full h-14 rounded-lg bg-white overflow-hidden border border-[#e2ebe6]">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=200"
                    alt="PBAT Film"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block text-[10px] font-bold text-[#0a0f0d]">PBAT Film</span>
              </div>

              <div className="p-2 bg-[#f9fcfb] rounded-xl border border-[#e2ebe6] text-center space-y-1.5">
                <div className="w-full h-14 rounded-lg bg-white overflow-hidden border border-[#e2ebe6]">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200"
                    alt="Moulded Pulp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="block text-[10px] font-bold text-[#0a0f0d]">Moulded Pulp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="px-6 pt-4 flex gap-3">
        <button
          onClick={() => navigate('/app/messages/supp-greenpack')}
          className="w-13 h-13 rounded-2xl border border-[#e2ebe6] hover:bg-[#f9fcfb] flex items-center justify-center text-[#0a0f0d] cursor-pointer"
          title="Chat with Supplier"
        >
          <MessageSquare size={18} />
        </button>

        <button
          onClick={() => navigate('/app/projects/proj-tomato-1/rfq')}
          className="flex-1 h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center shadow-xs cursor-pointer transition-all"
        >
          Request Quote
        </button>
      </div>
    </div>
  );
};
