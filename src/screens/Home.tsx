import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ScanLine, Bell, Sparkles, Store, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConverterHomeScreen } from './ConverterHomeScreen';
import { MaterialProducerHomeScreen } from './MaterialProducerHomeScreen';
import { PackhouseHomeScreen } from './PackhouseHomeScreen';
import { TransporterHomeScreen } from './TransporterHomeScreen';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, setActiveProjectId } = useApp();

  if (role === 'converter' || role === 'supplier') return <ConverterHomeScreen />;
  if (role === 'material_producer') return <MaterialProducerHomeScreen />;
  if (role === 'packhouse' || role === 'brand') return <PackhouseHomeScreen />;
  if (role === 'transporter') return <TransporterHomeScreen />;

  const handleStartRecommendation = () => {
    setActiveProjectId('proj-tomato-1');
    navigate('/app/projects/new');
  };

  return (
    <div className="bg-[#f9fcfb] min-h-full pb-24 select-none">
      {/* Header Bar */}
      <div className="bg-white px-5 pt-5 pb-3 border-b border-[#e2ebe6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#edf9f3] border border-[#c5d8ce] flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              alt="Aaryan"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-extrabold text-[#0a0f0d] text-base leading-tight">Hi, Aaryan</h2>
            <p className="text-[11px] font-medium text-[#6b8076]">Farmer • Delhi NCR</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/app/notifications')}
          className="relative w-9 h-9 rounded-xl bg-[#f2f6f4] hover:bg-[#e2ebe6] border border-[#e2ebe6] flex items-center justify-center text-[#1a2620] cursor-pointer"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0f4028]" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar with QR icon */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94aaa0]" />
          <input
            type="text"
            placeholder="Search commodity or packaging..."
            className="w-full h-11 pl-10 pr-10 bg-white rounded-xl border border-[#e2ebe6] text-xs font-medium text-[#0a0f0d] placeholder-[#94aaa0] focus:outline-none focus:border-[#0f4028]"
          />
          <button
            onClick={() => navigate('/app/projects/proj-tomato-1/qr')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b8076] hover:text-[#0f4028] cursor-pointer"
            title="Scan QR Code"
          >
            <ScanLine size={17} />
          </button>
        </div>

        {/* Hero Banner Card: AI Recommender */}
        <div
          onClick={handleStartRecommendation}
          className="p-4 rounded-2xl bg-[#edf9f3] border border-[#c5d8ce] flex items-center justify-between gap-3 cursor-pointer hover:bg-[#e6f6ee] transition-all shadow-2xs"
        >
          <div className="flex-1 space-y-1.5">
            <h3 className="font-extrabold text-sm text-[#0a0f0d] leading-snug">
              AI recommends the best packaging for your produce
            </h3>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0f4028]">
              <span>Try Now</span>
              <ArrowRight size={13} />
            </div>
          </div>

          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-[#c5d8ce]">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=200"
              alt="Fresh Produce Packaging"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Quick Actions (2x2 Grid) */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            {/* 1. Get Recommendation */}
            <div
              onClick={handleStartRecommendation}
              className="p-3.5 bg-white rounded-2xl border border-[#e2ebe6] hover:border-[#c5d8ce] cursor-pointer space-y-2 shadow-2xs transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#edf9f3] text-[#0f4028] flex items-center justify-center border border-[#c5d8ce]">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#0a0f0d]">Get Recommendation</h4>
                <p className="text-[10px] text-[#6b8076] mt-0.5">Matched to your crop</p>
              </div>
            </div>

            {/* 2. Find Supplier */}
            <div
              onClick={() => navigate('/app/suppliers')}
              className="p-3.5 bg-white rounded-2xl border border-[#e2ebe6] hover:border-[#c5d8ce] cursor-pointer space-y-2 shadow-2xs transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#edf9f3] text-[#0f4028] flex items-center justify-center border border-[#c5d8ce]">
                <Store size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#0a0f0d]">Find Supplier</h4>
                <p className="text-[10px] text-[#6b8076] mt-0.5">Verified converters</p>
              </div>
            </div>

            {/* 3. Track Order */}
            <div
              onClick={() => navigate('/app/projects/proj-tomato-1/order')}
              className="p-3.5 bg-white rounded-2xl border border-[#e2ebe6] hover:border-[#c5d8ce] cursor-pointer space-y-2 shadow-2xs transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#edf9f3] text-[#0f4028] flex items-center justify-center border border-[#c5d8ce]">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#0a0f0d]">Track Order</h4>
                <p className="text-[10px] text-[#6b8076] mt-0.5">Live status & dispatch</p>
              </div>
            </div>

            {/* 4. Product Traceability */}
            <div
              onClick={() => navigate('/app/projects/proj-tomato-1/qr')}
              className="p-3.5 bg-white rounded-2xl border border-[#e2ebe6] hover:border-[#c5d8ce] cursor-pointer space-y-2 shadow-2xs transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-[#edf9f3] text-[#0f4028] flex items-center justify-center border border-[#c5d8ce]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#0a0f0d]">Product Traceability</h4>
                <p className="text-[10px] text-[#6b8076] mt-0.5">Farm-to-fork batch QR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
