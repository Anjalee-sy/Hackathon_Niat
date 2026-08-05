import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label = 'Score',
  size = 140,
  strokeWidth = 12
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColorClass = (val: number) => {
    if (val >= 80) return { stroke: '#10b981', text: 'text-emerald-400', label: 'Excellent' };
    if (val >= 65) return { stroke: '#3b82f6', text: 'text-blue-400', label: 'Good' };
    if (val >= 50) return { stroke: '#f59e0b', text: 'text-amber-400', label: 'Average' };
    return { stroke: '#f43f5e', text: 'text-rose-400', label: 'Needs Work' };
  };

  const status = getColorClass(progress);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={status.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold tracking-tight ${status.text}`}>
            {progress}
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            / 100
          </span>
        </div>
      </div>
      {label && (
        <div className="mt-2 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</p>
          <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
        </div>
      )}
    </div>
  );
};
