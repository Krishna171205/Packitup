import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit';
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children, onClick, disabled, fullWidth, size = 'md', icon, iconPosition = 'left', className, type = 'button',
}) => {
  const sizes = {
    sm: 'py-2.5 px-4 text-xs rounded-xl gap-1.5',
    md: 'py-3.5 px-5 text-sm rounded-[14px] gap-2',
    lg: 'py-4 px-6 text-[15px] rounded-[14px] gap-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'btn-brand font-bold tracking-tight transition-all duration-150 select-none',
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children, onClick, disabled, fullWidth, size = 'md', icon, iconPosition = 'left', className, type = 'button',
}) => {
  const sizes = {
    sm: 'py-2.5 px-4 text-xs rounded-xl gap-1.5',
    md: 'py-3.5 px-5 text-sm rounded-[14px] gap-2',
    lg: 'py-4 px-6 text-[15px] rounded-[14px] gap-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'btn-outline font-semibold tracking-tight transition-all duration-150 select-none',
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
