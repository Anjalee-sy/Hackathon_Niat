import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Zap,
  Tag
} from 'lucide-react';
import { api } from '../lib/api';
import { GlassCard } from '../components/ui/GlassCard';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ResumeAnalysis as ResumeAnalysisType } from '../types';

export const ResumeAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: report, isLoading, error } = useQuery<ResumeAnalysisType>({
    queryKey: ['analysis', id],
    queryFn: async () => {
      const res = await api.get(`/history/${id}`);
      return res.data.data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        <SkeletonLoader className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonLoader className="h-64 w-full" />
          <SkeletonLoader className="h-64 w-full" />
        </div>
        <SkeletonLoader className="h-96 w-full" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="text-center py-16 space-y-4">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Analysis Report Not Found</h2>
        <p className="text-sm text-slate-400">The requested analysis ID could not be loaded.</p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info">AI Executive Audit</Badge>
            <span className="text-xs text-slate-400">• {new Date(report.created_at).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {report.job_title}
          </h1>
          {report.target_company && (
            <p className="text-sm text-slate-400 mt-0.5">Target Company: <span className="text-slate-200 font-semibold">{report.target_company}</span></p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cover-letter">
            <Button variant="primary" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
              Generate Cover Letter
            </Button>
          </Link>
          <Link to="/ats-report">
            <Button variant="secondary" size="sm" leftIcon={<Award className="w-4 h-4" />}>
              ATS Keyword Gap
            </Button>
          </Link>
        </div>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard hoverable glow="blue" className="flex items-center justify-around py-8">
          <ScoreGauge score={report.ats_score} label="ATS Match Rate" size={140} strokeWidth={12} />
          <div className="space-y-2 max-w-[200px]">
            <h3 className="text-base font-bold text-white">ATS Compatibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Measures how effectively automated recruiters parse your resume formatting & target keywords.
            </p>
          </div>
        </GlassCard>

        <GlassCard hoverable glow="purple" className="flex items-center justify-around py-8">
          <ScoreGauge score={report.overall_score} label="Holistic Resume Score" size={140} strokeWidth={12} />
          <div className="space-y-2 max-w-[200px]">
            <h3 className="text-base font-bold text-white">Content Quality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates impact verbs, quantifiable metrics, section flow, and clarity.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Executive Summary */}
      <GlassCard className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-400" /> Executive AI Summary
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          {report.summary}
        </p>
      </GlassCard>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <GlassCard className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Key Strengths
          </h3>
          <ul className="space-y-2.5">
            {report.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Weaknesses */}
        <GlassCard className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Areas for Growth
          </h3>
          <ul className="space-y-2.5">
            {report.weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Missing Skills Tags */}
      <GlassCard className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-brand-400" /> Missing ATS Keywords & Skills
        </h3>
        <p className="text-xs text-slate-400">
          These essential keywords appeared in the job description but were missing or weak in your resume text:
        </p>
        <div className="flex flex-wrap gap-2">
          {report.missing_skills.map((skill, idx) => (
            <Badge key={idx} variant="danger">
              + {skill}
            </Badge>
          ))}
          {report.missing_skills.length === 0 && (
            <p className="text-xs text-emerald-400">No missing skills detected! High match accuracy.</p>
          )}
        </div>
      </GlassCard>

      {/* Section by Section Improvement Recommendations */}
      <GlassCard className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Section Rewrites & Optimizations
          </h3>
          <p className="text-xs text-slate-400">Actionable recommendations to improve key sections</p>
        </div>

        <div className="space-y-4">
          {report.section_recommendations.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">{sec.section}</span>
                <Badge variant="info">Optimization Step</Badge>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400">Current Assessment:</p>
                <p className="text-xs text-slate-300">{sec.current_assessment}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400">Recommendation:</p>
                <p className="text-xs text-slate-300">{sec.recommendation}</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px] text-emerald-400">Recommended Rewrite Example:</p>
                <p className="font-mono text-emerald-200">{sec.example_improvement}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Grammar Corrections */}
      {report.grammar_issues.length > 0 && (
        <GlassCard className="space-y-4">
          <h3 className="text-base font-bold text-white">Grammar & Phrasing Corrections</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="p-3">Original Phrase</th>
                  <th className="p-3">Suggested Correction</th>
                  <th className="p-3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {report.grammar_issues.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="p-3 font-mono text-rose-300 line-through">{g.original}</td>
                    <td className="p-3 font-mono text-emerald-300">{g.correction}</td>
                    <td className="p-3 text-slate-400">{g.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Recruiter Tips */}
      <GlassCard className="space-y-4 bg-gradient-to-r from-brand-950/40 to-slate-900/80">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" /> Recruiter Insider Tips
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.recruiter_tips.map((tip, idx) => (
            <li key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
};
