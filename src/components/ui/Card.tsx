import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children, className, hoverable, onClick, padding = 'md',
}) => {
  const paddings = {
    none: '',
    sm:   'p-3',
    md:   'p-4',
    lg:   'p-5',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'card',
        paddings[padding],
        hoverable && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};
