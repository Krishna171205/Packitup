import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ChevronDown, 
  Globe, 
  RefreshCw, 
  X, 
  ArrowRight, 
  Sprout, 
  Boxes, 
  Factory, 
  Layers, 
  Truck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../data/mockData';

export const SimulationControls: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole, selectedTier, setSelectedTier, resetToDemoState, language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const rolesList: { id: UserRole; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'farmer', label: 'Farmer / Grower', icon: Sprout },
    { id: 'packhouse', label: 'Packhouse Operator', icon: Boxes },
    { id: 'converter', label: 'Packaging Converter', icon: Factory },
    { id: 'material_producer', label: 'Material Producer', icon: Layers },
    { id: 'transporter', label: 'Cold-Chain Logistics', icon: Truck },
  ];

  const tiersList = [
    { id: 'free', label: 'Essential' },
    { id: 'pro', label: 'Professional' },
    { id: 'enterprise', label: 'Enterprise Suite' },
  ];

  const screenSections = [
    {
      title: 'Farmer Journey',
      items: [
        { label: '1. Create Packaging Project', path: '/app/projects/new', role: 'farmer' as UserRole },
        { label: '2. AI Respiration & Shelf-Life', path: '/app/ai-analysis', role: 'farmer' as UserRole },
        { label: '3. Packaging Blueprint', path: '/app/blueprint', role: 'farmer' as UserRole },
        { label: '4. Bio-Material Comparison', path: '/app/options', role: 'farmer' as UserRole },
        { label: '5. Compare Supplier Quotes', path: '/app/quotes', role: 'farmer' as UserRole },
        { label: '6. Live Reverse Auction', path: '/app/live-bidding', role: 'farmer' as UserRole },
        { label: '7. Multi-Vendor RFQ Broadcast', path: '/app/multi-rfq', role: 'farmer' as UserRole },
        { label: '8. Batch Order Tracking', path: '/app/tracking', role: 'farmer' as UserRole },
        { label: '9. Farm-to-Fork QR Trace', path: '/app/traceability', role: 'farmer' as UserRole },
        { label: '10. Post-Harvest Feedback', path: '/app/feedback', role: 'farmer' as UserRole },
      ],
    },
    {
      title: 'Packhouse & Logistics Journey',
      items: [
        { label: 'Packhouse Dashboard', path: '/app/packhouse', role: 'packhouse' as UserRole },
        { label: 'Cold-Chain Transport Simulation', path: '/app/transport', role: 'packhouse' as UserRole },
        { label: 'Logistics Fleet Dispatch', path: '/app/transporter', role: 'transporter' as UserRole },
      ],
    },
    {
      title: 'Converter & Supplier Ecosystem',
      items: [
        { label: 'Converter Machine Queue', path: '/app/converter', role: 'converter' as UserRole },
        { label: 'Incoming RFQ Bidding Desk', path: '/app/converter/rfqs', role: 'converter' as UserRole },
        { label: 'Raw Resin Technical Catalog', path: '/app/materials', role: 'material_producer' as UserRole },
        { label: 'Polymer Compounder Portal', path: '/app/material-producer', role: 'material_producer' as UserRole },
      ],
    },
  ];

  const handleStepJump = (path: string, newRole: UserRole) => {
    setRole(newRole);
    navigate(path);
    setIsOpen(false);
  };

  const CurrentRoleIcon = rolesList.find((r) => r.id === role)?.icon || Sprout;

  return (
    <div className="sticky top-0 z-50 select-none">
      {/* Top Demo Trigger Bar */}
      <div className="bg-[#071f14] text-white px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-[#0f4028]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 font-bold text-[#a2e6bf] hover:text-white transition-colors cursor-pointer bg-[#0f4028] hover:bg-[#165c3a] px-2.5 py-0.5 rounded-full border border-[#165c3a]"
          >
            <Sparkles size={11} className="text-[#52c988]" />
            <span>Judge Demo Suite</span>
            <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Role Cycle */}
          <div className="flex items-center gap-1 text-[#94aaa0]">
            <span className="hidden xs:inline">Role:</span>
            <button
              onClick={() => {
                const currentIndex = rolesList.findIndex((r) => r.id === role);
                const nextIndex = (currentIndex + 1) % rolesList.length;
                setRole(rolesList[nextIndex].id);
              }}
              className="font-bold text-white bg-[#0f3220] hover:bg-[#0f4028] px-2 py-0.5 rounded cursor-pointer flex items-center gap-1.5 border border-[#165c3a]/50"
            >
              <CurrentRoleIcon size={12} className="text-[#a2e6bf]" />
              <span>{rolesList.find((r) => r.id === role)?.label || 'Farmer'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 text-[10px] font-bold text-[#a2e6bf] hover:text-white bg-[#0f3220] px-2 py-0.5 rounded-full cursor-pointer transition-colors border border-[#165c3a]/40"
          >
            <Globe size={11} />
            <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={() => {
              resetToDemoState();
              navigate('/app/home');
              setIsOpen(false);
            }}
            title="Reset to Banana Packaging Workflow"
            className="flex items-center gap-1 text-[10px] font-semibold text-[#94aaa0] hover:text-white bg-[#0f3220] px-2 py-0.5 rounded cursor-pointer transition-colors"
          >
            <RefreshCw size={10} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Expanded Modal / Dropdown Navigator */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#071f14]/85 backdrop-blur-sm flex items-start justify-center p-3 overflow-y-auto">
          <div className="bg-[#0b2418] border border-[#165c3a] rounded-2xl p-5 w-full max-w-md my-4 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#165c3a]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0f4028] text-[#a2e6bf] flex items-center justify-center border border-[#165c3a]">
                  <Sparkles size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">SIH Demo Navigator</h3>
                  <p className="text-[10px] text-[#94aaa0]">Direct access across all 5 supply-chain roles</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-[#0f3220] flex items-center justify-center text-[#94aaa0] hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* 1. View As Role Switcher */}
            <div>
              <p className="text-[10px] font-bold text-[#94aaa0] uppercase tracking-wider mb-2">
                1. Switch Active Stakeholder Role:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {rolesList.map((r) => {
                  const isCur = role === r.id;
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isCur
                          ? 'bg-[#0f4028] text-white border border-[#52c988] shadow-sm'
                          : 'bg-[#071f14] text-[#c2d0cc] hover:bg-[#0f3220] border border-[#165c3a]/30'
                      }`}
                    >
                      <Icon size={14} className={isCur ? 'text-[#a2e6bf]' : 'text-[#94aaa0]'} />
                      <span className="truncate">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Service Tier Switcher */}
            <div>
              <p className="text-[10px] font-bold text-[#94aaa0] uppercase tracking-wider mb-2">
                2. AI Service Tier:
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {tiersList.map((tItem) => {
                  const isCur = selectedTier === tItem.id;
                  return (
                    <button
                      key={tItem.id}
                      onClick={() => setSelectedTier(tItem.id as any)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                        isCur
                          ? 'border-[#52c988] bg-[#0f4028] text-white'
                          : 'border-[#165c3a]/40 bg-[#071f14] text-[#94aaa0] hover:bg-[#0f3220]'
                      }`}
                    >
                      {tItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Screen Sections Grid */}
            <div className="space-y-3 pt-1 border-t border-[#165c3a]/60 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
              {screenSections.map((sec) => (
                <div key={sec.title} className="space-y-1.5">
                  <h4 className="text-[10px] font-extrabold text-[#a2e6bf] uppercase tracking-wider">
                    {sec.title}
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {sec.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleStepJump(item.path, item.role)}
                        className="py-2 px-3 rounded-xl bg-[#071f14] hover:bg-[#0f4028] text-[#e6edea] text-xs font-semibold flex items-center justify-between text-left transition-colors cursor-pointer group border border-[#165c3a]/30"
                      >
                        <span className="group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        <ArrowRight size={12} className="text-[#94aaa0] group-hover:text-[#a2e6bf] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-[#165c3a]/60">
              <button
                onClick={() => {
                  resetToDemoState();
                  navigate('/app/home');
                  setIsOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#0f3220] hover:bg-[#0f4028] text-xs font-bold text-[#c2d0cc] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer border border-[#165c3a]"
              >
                <RefreshCw size={13} />
                <span>Reset to Banana Packaging Workflow</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
