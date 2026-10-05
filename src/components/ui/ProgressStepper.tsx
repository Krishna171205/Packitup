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
        <div className="flex items-center justify-between text-xs text-[#6b8076] mb-1.5 font-medium">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span className="font-bold text-[#0f4028]">{steps[currentStepIndex]?.label}</span>
        </div>
        <div className="w-full bg-[#f2f6f4] rounded-full h-1.5 overflow-hidden flex gap-1 border border-[#e2ebe6]">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStepIndex ? 'bg-[#0f4028]' : 'bg-[#e2ebe6]'
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

          return (
            <div key={step.id} className="flex items-start gap-3 relative">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-3.5 top-7 bottom-[-16px] w-0.5 ${
                    isDone ? 'bg-[#0f4028]' : 'bg-[#e2ebe6]'
                  }`}
                />
              )}

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-[#0f4028] text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#071f14] text-white ring-4 ring-[#edf9f3] border border-[#0f4028]'
                    : 'bg-[#f2f6f4] text-[#94aaa0] border border-[#e2ebe6]'
                }`}
              >
                {isDone ? <Check size={13} strokeWidth={3} /> : idx + 1}
              </div>

              <div className="pt-0.5">
                <p className={`text-sm font-bold ${isCurrent ? 'text-[#0a0f0d]' : isDone ? 'text-[#1a2620]' : 'text-[#94aaa0]'}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-[#6b8076] mt-0.5 leading-snug">{step.description}</p>
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
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#e2ebe6] -translate-y-1/2 z-0" />
      <div
        className="absolute top-1/2 left-4 h-0.5 bg-[#0f4028] -translate-y-1/2 z-0 transition-all duration-300"
        style={{ width: `${(currentStepIndex / Math.max(steps.length - 1, 1)) * 92}%` }}
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
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                isDone
                  ? 'bg-[#0f4028] text-white shadow-xs'
                  : isCurrent
                  ? 'bg-[#071f14] text-white ring-4 ring-[#edf9f3] border border-[#0f4028] scale-105'
                  : 'bg-white border border-[#c5d8ce] text-[#94aaa0]'
              }`}
            >
              {isDone ? <Check size={12} strokeWidth={3} /> : idx + 1}
            </div>
            <span
              className={`text-[10px] mt-1 font-semibold max-w-[64px] truncate text-center ${
                isCurrent ? 'text-[#0a0f0d] font-bold' : isDone ? 'text-[#3d5347]' : 'text-[#94aaa0]'
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
