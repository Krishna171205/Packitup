import React from 'react';
import { PrimaryButton } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-[#e2ebe6] shadow-xs">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-[#edf9f3] text-[#0f4028] flex items-center justify-center mb-3 text-xl border border-[#c5d8ce]">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-extrabold text-[#0a0f0d] mb-1">{title}</h3>
      <p className="text-xs text-[#6b8076] max-w-xs mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <PrimaryButton size="sm" onClick={onAction}>
          {actionLabel}
        </PrimaryButton>
      )}
    </div>
  );
};
