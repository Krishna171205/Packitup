import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  steps: {
    id: string;
    label: string;
    description?: string;
  }[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  variant?: 'horizontal' | 'compact' | 'vertical';
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  variant = 'horizontal',
}) => {
  if (variant === 'compact') {
    return (
      <div className="w-full py-2">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span className="font-bold text-[#059669]">{steps[currentStepIndex]?.label}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden flex gap-1">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStepIndex ? 'bg-[#10B981]' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-4 py-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div key={step.id} className="flex items-start gap-3 relative">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-3.5 top-7 bottom-[-16px] w-0.5 ${
                    isDone ? 'bg-[#10B981]' : 'bg-slate-200'
                  }`}
                />
              )}

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-[#10B981] text-white'
                    : isCurrent
                    ? 'bg-[#0F172A] text-white ring-4 ring-[#10B981]/20 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : idx + 1}
              </div>

              <div className="pt-0.5">
                <p className={`text-sm font-bold ${isCurrent ? 'text-slate-900' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full relative py-2">
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
      <div
        className="absolute top-1/2 left-4 h-0.5 bg-[#10B981] -translate-y-1/2 z-0 transition-all duration-300"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 92}%` }}
      />

      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick && onStepClick(idx)}
            className="flex flex-col items-center z-10 focus:outline-none cursor-pointer group"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                isDone
                  ? 'bg-[#10B981] text-white shadow-sm'
                  : isCurrent
                  ? 'bg-[#0F172A] text-white ring-4 ring-[#10B981]/30 scale-110 shadow-md'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              {isDone ? <Check size={14} strokeWidth={3} /> : idx + 1}
            </div>
            <span
              className={`text-[10px] mt-1 font-semibold max-w-[60px] truncate text-center ${
                isCurrent ? 'text-[#0F172A]' : isDone ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
