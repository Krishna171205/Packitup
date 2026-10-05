import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Loader2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const analysisSteps = [
  { title: 'Understanding food biology', detail: 'Climacteric fruit · High ethylene autocatalysis detected' },
  { title: 'Identifying spoilage risks', detail: 'Surface abrasion + moisture condensation risk flagged' },
  { title: 'Calculating barrier requirements', detail: 'Target: 3–5% O₂, 5% CO₂ · OTR: 45–65 cc/m²/day' },
  { title: 'Matching polymer materials', detail: 'Evaluating PET/PE · LDPE perforated · PLA/PBAT bio-films' },
  { title: 'Finding local manufacturers', detail: 'Scanning 10 Delhi NCR converters with food-grade lines' },
  { title: 'Building packaging blueprint', detail: 'Synthesizing cost, shelf life & sustainability trade-offs' },
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
    }, 900);
    return () => clearInterval(timer);
  }, [id]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white select-none">
      {/* Header */}
      <div className="pt-10 pb-4 px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold mb-3">
          <Sparkles size={12} />
          <span>AI Analysis Running</span>
        </div>
        <h1 className="text-xl font-extrabold text-white leading-tight">
          {isCompleted ? '🎉 Blueprint is Ready!' : 'Analyzing your packaging need…'}
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {project?.foodName || 'Banana'} · {project?.quantity || 500} kg · {project?.targetShelfLifeDays || 10} day target
        </p>
      </div>

      {/* Analysis steps */}
      <div className="flex-1 px-5 py-4">
        <div className="bg-gray-800/80 rounded-3xl p-5 border border-gray-700 space-y-4">
          {analysisSteps.map((st, idx) => {
            const isDone = idx < activeStep || isCompleted;
            const isCurrent = idx === activeStep && !isCompleted;
            const isPending = idx > activeStep && !isCompleted;

            return (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx < analysisSteps.length - 1 && (
                  <div className={`absolute left-3 top-7 bottom-[-16px] w-0.5 transition-colors duration-300 ${isDone ? 'bg-green-500' : 'bg-gray-700'}`} />
                )}

                {/* Icon */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                  isDone ? 'bg-green-500 text-white'
                  : isCurrent ? 'bg-gray-900 border-2 border-green-400 ring-4 ring-green-500/20'
                  : 'bg-gray-800 border border-gray-600'
                }`}>
                  {isDone ? <Check size={12} strokeWidth={3} /> : isCurrent ? <Loader2 size={12} className="animate-spin text-green-400" /> : null}
                </div>

                {/* Text */}
                <div className="flex-1 pt-0.5">
                  <p className={`text-xs font-bold leading-tight ${isDone ? 'text-white' : isCurrent ? 'text-green-400' : 'text-gray-500'}`}>
                    {st.title}
                  </p>
                  {isCurrent && (
                    <div className="mt-1.5 p-2 rounded-xl bg-gray-900 border border-gray-700 text-[10px] text-gray-300 font-mono animate-fade-in">
                      <span className="text-green-400 font-bold block mb-0.5">STATUS:</span>
                      {st.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-5 pb-10 space-y-3">
        {isCompleted ? (
          <button
            onClick={() => navigate(`/app/projects/${id || 'proj-banana-1'}/blueprint`)}
            className="btn-brand w-full py-4 text-[15px] animate-fade-up"
          >
            View Packaging Blueprint <ArrowRight size={18} />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-3">
            <Loader2 size={15} className="animate-spin text-green-500" />
            <span>Computing optimal barrier balance…</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-600">
          <ShieldCheck size={11} className="text-green-500" />
          <span>PACKITUP AI · Non-destructive shelf-life optimization</span>
        </div>
      </div>
    </div>
  );
};
