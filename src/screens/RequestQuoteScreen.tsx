import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

export const RequestQuoteScreen: React.FC = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('500 kg');
  const [deliveryDate, setDeliveryDate] = useState('15 Sep 2026');
  const [notes, setNotes] = useState('Reusable crates preferred');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app/projects/proj-tomato-1/order');
  };

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
      <div>
        {/* Top Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-[#e2ebe6]">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] flex items-center justify-center text-[#0a0f0d] cursor-pointer border border-[#e2ebe6]"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-bold text-[#6b8076]">3/4</span>
        </div>

        <div className="p-6 space-y-5">
          <h1 className="text-xl font-extrabold text-[#0a0f0d] tracking-tight">
            Request for Quote
          </h1>

          {/* Selected Item Summary Card */}
          <div className="p-3 bg-[#f9fcfb] rounded-2xl border border-[#e2ebe6] flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-[#e2ebe6] flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150"
                alt="Boxes"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-[#0a0f0d]">PLA + PBAT Film</h3>
              <p className="text-[11px] text-[#6b8076]">from GreenPack Solutions</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-12 px-3.5 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] focus:outline-none focus:border-[#0f4028]"
              />
            </div>

            {/* Expected Delivery */}
            <div>
              <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                Expected Delivery
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full h-12 px-3.5 pr-10 bg-white rounded-xl border border-[#e2ebe6] text-sm font-semibold text-[#0a0f0d] focus:outline-none focus:border-[#0f4028]"
                />
                <Calendar size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94aaa0] pointer-events-none" />
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-xs font-bold text-[#1a2620] mb-1.5">
                Additional Requirements
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3.5 bg-white rounded-xl border border-[#e2ebe6] text-xs font-medium text-[#0a0f0d] focus:outline-none focus:border-[#0f4028]"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Send Button */}
      <div className="px-6 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full h-13 rounded-2xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center shadow-xs cursor-pointer transition-all"
        >
          Send Request
        </button>
      </div>
    </div>
  );
};
