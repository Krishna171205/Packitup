import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'green' | 'blue' | 'amber' | 'red' | 'slate' | 'purple';
type BadgeSize = 'xs' | 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  green: 'chip-green',
  blue:  'chip-blue',
  amber: 'chip-amber',
  red:   'chip-red',
  slate: 'chip-slate',
  purple: 'chip-purple',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', size = 'sm', className }) => {
  return (
    <span className={clsx('chip', variantMap[variant], className)}>
      {children}
    </span>
  );
};

// Status badge mapped to project statuses
const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  ANALYSIS:         { label: 'Analyzing', variant: 'blue' },
  BLUEPRINT:        { label: 'Blueprint Ready', variant: 'green' },
  OPTIONS:          { label: 'Options Ready', variant: 'green' },
  SUPPLIER_SEARCH:  { label: 'Finding Suppliers', variant: 'amber' },
  RFQ_SENT:         { label: 'RFQ Sent', variant: 'blue' },
  QUOTES_RECEIVED:  { label: 'Quotes Received', variant: 'amber' },
  ORDER_PLACED:     { label: 'Order Placed', variant: 'blue' },
  IN_PRODUCTION:    { label: 'In Production', variant: 'amber' },
  DISPATCHED:       { label: 'Dispatched', variant: 'green' },
  DELIVERED:        { label: 'Delivered', variant: 'green' },
  FEEDBACK:         { label: 'Feedback', variant: 'slate' },
  COMPLETED:        { label: 'Completed', variant: 'green' },
};

export const StatusBadge: React.FC<{ status: string; size?: BadgeSize }> = ({ status, size }) => {
  const cfg = statusConfig[status] || { label: status, variant: 'slate' as BadgeVariant };
  return <Badge variant={cfg.variant} size={size}>{cfg.label}</Badge>;
};
