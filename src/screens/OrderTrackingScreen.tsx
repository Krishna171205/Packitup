import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Truck, QrCode } from 'lucide-react';

const STEPS = [
  { title: 'Order Placed', time: '12 Sep, 10:30 AM', status: 'done' },
  { title: 'Production', time: 'In Progress', status: 'done' },
  { title: 'Dispatched', time: 'Expected: 15 Sep', status: 'current' },
  { title: 'Out for Delivery', time: 'Pending', status: 'pending' },
  { title: 'Delivered', time: 'Pending', status: 'pending' },
];

export const OrderTrackingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white flex flex-col justify-between pb-8 select-none">
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
            <h1 className="text-lg font-extrabold text-[#0a0f0d]">Order Tracking</h1>
          </div>

          <button
            onClick={() => navigate('/app/projects/proj-tomato-1/qr')}
            className="w-9 h-9 rounded-xl bg-[#edf9f3] text-[#0f4028] border border-[#c5d8ce] flex items-center justify-center cursor-pointer"
            title="View Traceability QR"
          >
            <QrCode size={17} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Order ID & In Transit Badge */}
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-[#0a0f0d]">#PU2456T9</span>
            <span className="px-3 py-1 rounded-full bg-[#edf9f3] border border-[#c5d8ce] text-[#0f4028] text-xs font-bold">
              In Transit
            </span>
          </div>

          {/* 5-Step Vertical Timeline */}
          <div className="space-y-4 pt-1">
            {STEPS.map((s, idx) => {
              const isDone = s.status === 'done';
              const isCurrent = s.status === 'current';

              return (
                <div key={s.title} className="flex items-start gap-3.5 relative">
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`absolute left-3.5 top-7 bottom-[-16px] w-0.5 ${
                        isDone ? 'bg-[#0f4028]' : 'bg-[#e2ebe6]'
                      }`}
                    />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                      isDone
                        ? 'bg-[#0f4028] text-white'
                        : isCurrent
                        ? 'border-2 border-[#0f4028] bg-white ring-4 ring-[#edf9f3]'
                        : 'bg-[#f2f6f4] border border-[#e2ebe6]'
                    }`}
                  >
                    {isDone ? (
                      <Check size={13} strokeWidth={3} />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#0f4028]" />
                    ) : null}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-extrabold ${
                        isDone || isCurrent ? 'text-[#0a0f0d]' : 'text-[#94aaa0]'
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-[#6b8076] mt-0.5">{s.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Preview with Transit Route & Truck */}
          <div className="w-full h-32 rounded-2xl bg-[#edf9f3] border border-[#c5d8ce] p-3 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-[#3d5347] font-semibold z-10">
              <span>Noida Facility</span>
              <span>Delhi NCR Mandi</span>
            </div>

            {/* Route illustration */}
            <div className="relative w-full h-8 flex items-center justify-center z-10">
              <div className="w-full h-1 bg-[#c5d8ce] rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0f4028] text-white flex items-center justify-center shadow-xs">
                <Truck size={15} />
              </div>
            </div>

            <div className="text-[10px] text-[#6b8076] text-center z-10">
              Driver: Ravinder Singh • +91 98721 00412
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
