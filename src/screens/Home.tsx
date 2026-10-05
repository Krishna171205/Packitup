import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ScanLine, Bell, Box, Users, Truck, QrCode, ArrowRight
} from 'lucide-react';
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
    setActiveProjectId('proj-new');
    navigate('/app/projects/new');
  };

  return (
    <div className="bg-white min-h-full pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=aaryan" alt="Aaryan" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Hi, {user?.name || 'Aaryan'}</h2>
            <p className="text-xs text-gray-500 font-medium">Farmer • Delhi NCR</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-700">
          <Bell size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search commodity or packaging..."
            className="w-full pl-11 pr-12 py-4 bg-[#f8fafc] border border-gray-100 rounded-[20px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f4028]/20 focus:border-[#0f4028]"
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <ScanLine size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-5 mb-8">
        <div 
          onClick={handleStartRecommendation}
          className="relative bg-[#0f4028] rounded-[24px] overflow-hidden p-6 shadow-xl cursor-pointer"
        >
          {/* Subtle background decoration */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 right-12 w-24 h-24 bg-green-400/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 w-2/3">
            <h3 className="text-white text-lg font-bold leading-snug mb-4">
              AI recommends<br />the best packaging<br />for your produce
            </h3>
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              Try Now <ArrowRight size={16} />
            </div>
          </div>
          
          {/* Produce Image Mock */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-green-800 to-transparent flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300" alt="Produce" className="w-32 h-32 object-cover rounded-full shadow-2xl rotate-12 opacity-90 mix-blend-luminosity" />
          </div>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="px-5 grid grid-cols-2 gap-4">
        <button 
          onClick={handleStartRecommendation}
          className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center">
            <Box size={24} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">Get<br/>Recommendation</span>
        </button>

        <button 
          onClick={() => navigate('/app/suppliers')}
          className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center">
            <Users size={24} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">Find<br/>Supplier</span>
        </button>

        <button 
          onClick={() => navigate('/app/projects')}
          className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center">
            <Truck size={24} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">Track<br/>Order</span>
        </button>

        <button 
          onClick={() => {
            setActiveProjectId('proj-banana-1');
            navigate('/app/projects/proj-banana-1/qr');
          }}
          className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-[#f1f7f4] text-[#165c3a] flex items-center justify-center">
            <QrCode size={24} strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">Product<br/>Traceability</span>
        </button>
      </div>

    </div>
  );
};
