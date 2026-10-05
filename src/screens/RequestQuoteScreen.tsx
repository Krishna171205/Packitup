import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Send } from 'lucide-react';

export const RequestQuoteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState('500 kg');
  const [deliveryDate, setDeliveryDate] = useState('15 Sep 2026');
  const [notes, setNotes] = useState('Reusable crates preferred');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/app/projects/${id || 'proj-tomato-1'}/order`);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none justify-between p-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-bold text-gray-400">
            3/4
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
          Request for Quote
        </h1>

        {/* Selected Product Card */}
        <div className="flex items-center gap-4 p-3.5 bg-[#f8fafc] border border-gray-100 rounded-2xl mb-6">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200"
              alt="PLA + PBAT Film"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              PLA + PBAT Film
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              from GreenPack Solutions
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form id="rfq-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">
              Quantity
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">
              Expected Delivery
            </label>
            <div className="relative">
              <input
                type="text"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl py-4 px-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
              />
              <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">
              Additional Requirements
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-4 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028] resize-none"
            />
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="pb-4 pt-6">
        <button
          type="submit"
          form="rfq-form"
          className="w-full py-4 bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold rounded-full text-base transition-all shadow-lg shadow-[#0f4028]/20 cursor-pointer active:scale-98"
        >
          Send Request
        </button>
      </div>
    </div>
  );
};
