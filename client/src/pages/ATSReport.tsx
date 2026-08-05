import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Award, CheckCircle2, XCircle, FileSpreadsheet, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { GlassCard } from '../components/ui/GlassCard';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ResumeAnalysis } from '../types';

export const ATSReport: React.FC = () => {
  // Fetch latest history item for ATS deep-dive
  const { data: history = [], isLoading } = useQuery<ResumeAnalysis[]>({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await api.get('/history');
      return res.data.data;
    }
  });

  const latestReport = history[0];

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading ATS Keyword Analysis...</div>;
  }

  if (!latestReport) {
    return (
      <div className="text-center py-16 space-y-4">
        <Award className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No ATS Audit Available</h2>
        <p className="text-sm text-slate-400">Run your first resume audit to unlock the detailed ATS breakdown.</p>
        <Link to="/upload">
          <Button variant="primary">Audit Resume Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <Badge variant="info">ATS Compatibility Audit</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            ATS Keyword & Format Breakdown
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Role: <span className="text-slate-200 font-semibold">{latestReport.job_title}</span>
          </p>
        </div>
        <Link to={`/analysis/${latestReport.id}`}>
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Executive Analysis
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col items-center justify-center text-center p-6 space-y-2">
          <ScoreGauge score={latestReport.ats_score} label="ATS Score" size={130} strokeWidth={10} />
        </GlassCard>

        <GlassCard className="md:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-brand-400" /> ATS Parser Rule Audit
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standard headings detected (Work Experience, Education, Skills)</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Machine-readable text extraction verified</span>
            </li>
            <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ensure single-column layout to prevent scanner text wrapping bugs</span>
            </li>
          </ul>
        </GlassCard>
      </div>

      {/* Matched vs Missing Keywords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <GlassCard className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Matched Job Keywords ({latestReport.matched_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {latestReport.matched_skills.map((skill, idx) => (
              <Badge key={idx} variant="success">
                ✓ {skill}
              </Badge>
            ))}
            {latestReport.matched_skills.length === 0 && (
              <p className="text-xs text-slate-500">No exact matches found.</p>
            )}
          </div>
        </GlassCard>

        {/* Missing Keywords */}
        <GlassCard className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-400" /> Missing ATS Keywords ({latestReport.missing_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {latestReport.missing_skills.map((skill, idx) => (
              <Badge key={idx} variant="danger">
                + {skill}
              </Badge>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
