import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Truck, MapPin } from 'lucide-react';

export const OrderTrackingScreen: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    { title: 'Order Placed', time: '12 Sep, 10:30 AM', status: 'completed' },
    { title: 'Production', time: 'In Progress', status: 'completed' },
    { title: 'Dispatched', time: 'Expected: 15 Sep', status: 'active' },
    { title: 'Out for Delivery', time: 'Pending', status: 'pending' },
    { title: 'Delivered', time: 'Pending', status: 'pending' },
  ];

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

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
          Order Tracking
        </h1>

        {/* Order ID & Status Badge */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 mb-6">
          <span className="text-sm font-bold text-gray-900">#PU2456T9</span>
          <span className="px-3.5 py-1 bg-[#f1f7f4] text-[#165c3a] text-xs font-bold rounded-full">
            In Transit
          </span>
        </div>

        {/* Timeline Stepper */}
        <div className="space-y-6 relative pl-2">
          {steps.map((st, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={st.title} className="flex gap-4 relative">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute left-3.5 top-7 w-[2px] h-8 ${
                      st.status === 'completed' ? 'bg-[#0f4028]' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Step Node */}
                <div className="relative z-10 shrink-0">
                  {st.status === 'completed' ? (
                    <div className="w-7 h-7 rounded-full bg-[#0f4028] text-white flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  ) : st.status === 'active' ? (
                    <div className="w-7 h-7 rounded-full bg-[#f1f7f4] border-2 border-[#0f4028] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0f4028]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-300 text-xs">
                      +
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="pt-0.5">
                  <h4 className={`text-sm font-bold ${st.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {st.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {st.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini Map Card */}
      <div className="pb-4 pt-6">
        <div className="w-full h-36 bg-[#f1f7f4]/60 border border-emerald-100 rounded-[28px] overflow-hidden relative flex items-center justify-center p-4">
          {/* Stylized route path */}
          <svg className="w-full h-full" viewBox="0 0 300 100" fill="none">
            <path
              d="M 30 70 Q 150 20 270 60"
              stroke="#0f4028"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            {/* Origin Pin */}
            <circle cx="30" cy="70" r="5" fill="#0f4028" />
            {/* Destination Pin */}
            <circle cx="270" cy="60" r="5" fill="#16a34a" />
          </svg>

          {/* Delivery Truck Icon on the route */}
          <div className="absolute left-[52%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0f4028] text-white flex items-center justify-center shadow-lg shadow-[#0f4028]/30">
            <Truck size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
