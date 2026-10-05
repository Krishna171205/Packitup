import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Loader2, Sparkles, ArrowRight, ShieldCheck, Activity, Dna, Gauge } from 'lucide-react';
import { useApp } from '../context/AppContext';

const analysisSteps = [
  { title: 'Food Biology & Ethylene Model', detail: 'Climacteric fruit · High ethylene autocatalysis detected (2.4 µL/kg·h)' },
  { title: 'Pathogen & Spoilage Vectors', detail: 'Surface abrasion + moisture condensation risk flagged' },
  { title: 'Modified Atmosphere Optimization', detail: 'Target: 3–5% O₂, 5% CO₂ · Equilibrium OTR: 45–65 cc/m²/day' },
  { title: 'Bio-Polymer Matrix Matching', detail: 'Simulating PLA/PBAT blend vs Micro-perforated bio-film' },
  { title: 'Converter Capacity Screening', detail: 'Scanning certified regional converters with food-grade certifications' },
  { title: 'Synthesizing Technical Blueprint', detail: 'Computing cost, shelf life extension & carbon footprint balance' },
];

export const AIAnalysisScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getActiveProject, updateProject } = useApp();
  const project = getActiveProject();

  const [activeStep, setActiveStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        clearInterval(timer);
        setIsCompleted(true);
        if (id) updateProject(id, { status: 'BLUEPRINT' });
        return prev;
      });
    }, 850);
    return () => clearInterval(timer);
  }, [id]);

  return (
    <div className="flex flex-col h-full bg-[#071f14] text-white select-none relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle at 50% 20%, #1f7a50 0%, transparent 60%)' }}
      />

      {/* Header */}
      <div className="pt-8 pb-3 px-5 text-center relative z-10 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f4028] border border-[#165c3a] text-[#a2e6bf] text-[11px] font-bold tracking-wide uppercase mb-2.5">
          <Activity size={12} className="text-[#52c988] animate-pulse" />
          <span>Biochemical Packaging Simulation</span>
        </div>
        
        <h1 className="text-xl font-extrabold text-white leading-tight tracking-tight">
          {isCompleted ? 'Optimal Blueprint Synthesized' : 'Computing Barrier Dynamics...'}
        </h1>
        
        <p className="text-xs text-[#94aaa0] mt-1 font-medium">
          {project?.foodName || 'Cavendish Banana'} · {project?.quantity || 500} kg · {project?.targetShelfLifeDays || 14} Day Shelf-Life Target
        </p>
      </div>

      {/* Live Scientific Metrics Chamber */}
      <div className="px-5 py-2 relative z-10 shrink-0">
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#0b2418]/80 backdrop-blur-md rounded-2xl border border-[#165c3a]/50 text-center">
          <div>
            <div className="text-[10px] text-[#94aaa0] uppercase tracking-wider font-semibold">Respiration</div>
            <div className="text-xs font-mono font-bold text-[#52c988] mt-0.5">High (Clim.)</div>
          </div>
          <div className="border-x border-[#165c3a]/50">
            <div className="text-[10px] text-[#94aaa0] uppercase tracking-wider font-semibold">Target OTR</div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">52 cc/m²·d</div>
          </div>
          <div>
            <div className="text-[10px] text-[#94aaa0] uppercase tracking-wider font-semibold">WVTR Limit</div>
            <div className="text-xs font-mono font-bold text-[#a2e6bf] mt-0.5">18 g/m²·d</div>
          </div>
        </div>
      </div>

      {/* Analysis steps progression */}
      <div className="flex-1 px-5 py-3 overflow-y-auto no-scrollbar relative z-10">
        <div className="bg-[#0b2418]/90 rounded-2xl p-4 border border-[#165c3a]/40 space-y-3.5 shadow-xl">
          {analysisSteps.map((st, idx) => {
            const isDone = idx < activeStep || isCompleted;
            const isCurrent = idx === activeStep && !isCompleted;

            return (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx < analysisSteps.length - 1 && (
                  <div 
                    className={`absolute left-3 top-7 bottom-[-14px] w-0.5 transition-colors duration-300 ${
                      isDone ? 'bg-[#2da464]' : 'bg-[#165c3a]/30'
                    }`} 
                  />
                )}

                {/* Status indicator node */}
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                    isDone 
                      ? 'bg-[#0f4028] text-[#a2e6bf] border border-[#52c988]'
                      : isCurrent 
                      ? 'bg-[#071f14] border-2 border-[#52c988] ring-4 ring-[#52c988]/20'
                      : 'bg-[#071f14] border border-[#165c3a]/40 text-[#6b8076]'
                  }`}
                >
                  {isDone ? (
                    <Check size={12} strokeWidth={3} />
                  ) : isCurrent ? (
                    <Loader2 size={12} className="animate-spin text-[#52c988]" />
                  ) : (
                    <span className="text-[9px] font-mono">{idx + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-0.5">
                  <p className={`text-xs font-bold leading-tight ${
                    isDone ? 'text-white' : isCurrent ? 'text-[#a2e6bf]' : 'text-[#6b8076]'
                  }`}>
                    {st.title}
                  </p>
                  
                  {isCurrent && (
                    <div className="mt-1.5 p-2 rounded-xl bg-[#071f14] border border-[#165c3a] text-[10px] text-[#c2d0cc] font-mono animate-fade-in">
                      <span className="text-[#52c988] font-bold block mb-0.5 tracking-wider">COMPUTING:</span>
                      {st.detail}
                    </div>
                  )}

                  {isDone && !isCurrent && (
                    <p className="text-[10px] text-[#94aaa0] mt-0.5">{st.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-8 pt-2 space-y-2.5 relative z-10 shrink-0 bg-gradient-to-t from-[#071f14] via-[#071f14] to-transparent">
        {isCompleted ? (
          <button
            onClick={() => navigate(`/app/projects/${id || 'proj-banana-1'}/blueprint`)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0f4028] hover:bg-[#165c3a] text-white font-bold text-sm flex items-center justify-center gap-2 border border-[#52c988]/40 shadow-lg cursor-pointer transition-all animate-fade-up"
          >
            <span>View Packaging Blueprint</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-[#94aaa0] py-2">
            <Loader2 size={14} className="animate-spin text-[#52c988]" />
            <span>Balancing Gas Permeability with Shelf-Life Target...</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#94aaa0]">
          <ShieldCheck size={12} className="text-[#52c988]" />
          <span>FSSAI & ASTM Calibrated Non-Destructive Packaging Model</span>
        </div>
      </div>
    </div>
  );
};
