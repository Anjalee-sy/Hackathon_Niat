import React from 'react';
import { clsx } from 'clsx';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  glow?: 'blue' | 'purple' | 'none';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverable = false,
  glow = 'none',
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300',
        hoverable && 'glass-panel-hover',
        glow === 'blue' && 'glow-blue',
        glow === 'purple' && 'glow-purple',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
