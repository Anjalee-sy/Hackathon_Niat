import React from 'react';
import { clsx } from 'clsx';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'animate-pulse bg-slate-800/60 rounded-xl border border-slate-700/30',
            className
          )}
        />
      ))}
    </>
  );
};
