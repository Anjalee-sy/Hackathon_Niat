import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Upload,
  FileCheck,
  FileText,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { Badge } from '../components/ui/Badge';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ResumeAnalysis } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: history = [], isLoading } = useQuery<ResumeAnalysis[]>({
    queryKey: ['history'],
    queryFn: async () => {
      const res = await api.get('/history');
      return res.data.data;
    }
  });

  const averageAtsScore = history.length > 0
    ? Math.round(history.reduce((acc, item) => acc + item.ats_score, 0) / history.length)
    : 0;

  const chartData = [...history].reverse().map((item, idx) => ({
    name: item.target_company || `Audit #${idx + 1}`,
    ATS: item.ats_score,
    Overall: item.overall_score
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="text-brand-400">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your ATS score improvements, resume optimizations, and tailored cover letters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button variant="primary" size="md" leftIcon={<Upload className="w-4 h-4" />}>
              Upload & Analyze
            </Button>
          </Link>
          <Link to="/cover-letter">
            <Button variant="secondary" size="md" leftIcon={<FileText className="w-4 h-4" />}>
              New Cover Letter
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Average ATS Score</p>
            <p className="text-3xl font-extrabold text-white">{averageAtsScore}<span className="text-sm font-normal text-slate-400">/100</span></p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Based on {history.length} audit reports</span>
            </div>
          </div>
          <ScoreGauge score={averageAtsScore} size={90} strokeWidth={8} />
        </GlassCard>

        <GlassCard hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Total Resumes Audited</p>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{history.length}</p>
          <p className="text-xs text-slate-400">Optimized against target job specs</p>
        </GlassCard>

        <GlassCard hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Active Engine</p>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-100">Gemini 2.5 Flash</p>
          <Badge variant="success">Strict JSON Parser Operational</Badge>
        </GlassCard>
      </div>

      {/* Analytics Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ATS Progress Trend */}
        <GlassCard className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">ATS Score Progression</h3>
              <p className="text-xs text-slate-400">Historical performance trends across recent application reviews</p>
            </div>
            <Badge variant="info">Real-Time Data</Badge>
          </div>

          {isLoading ? (
            <SkeletonLoader className="h-64 w-full" />
          ) : chartData.length > 0 ? (
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0c7eff" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0c7eff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                  />
                  <Area type="monotone" dataKey="ATS" stroke="#0c7eff" strokeWidth={3} fillOpacity={1} fill="url(#colorAts)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl">
              <Award className="w-10 h-10 text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">No Audits Run Yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">Upload your first resume to view your score trend line here.</p>
            </div>
          )}
        </GlassCard>

        {/* Quick Start Actions */}
        <GlassCard className="space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Quick Actions</h3>
            <p className="text-xs text-slate-400 mb-6">Launch an AI workflow in seconds</p>

            <div className="space-y-3">
              <Link to="/upload" className="block">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-brand-400 transition-colors">Audit New Resume</p>
                      <p className="text-[11px] text-slate-400">PDF, DOCX or text snippet</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link to="/cover-letter" className="block">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">Write Cover Letter</p>
                      <p className="text-[11px] text-slate-400">Markdown format output</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <Link to="/history" className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View full audit history <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Recent Analyses List */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Analyses</h3>
            <p className="text-xs text-slate-400">Review past reports and track keyword optimization</p>
          </div>
          <Link to="/history">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <SkeletonLoader count={3} className="h-16 w-full" />
        ) : history.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {history.slice(0, 5).map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between hover:bg-slate-800/30 px-2 rounded-lg transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">{item.job_title}</span>
                    {item.target_company && (
                      <span className="text-xs text-slate-400 font-medium">@ {item.target_company}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 line-clamp-1 max-w-md">{item.summary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">ATS Score</span>
                    <Badge variant={item.ats_score >= 75 ? 'success' : item.ats_score >= 55 ? 'warning' : 'danger'}>
                      {item.ats_score}% Match
                    </Badge>
                  </div>
                  <Link to={`/analysis/${item.id}`}>
                    <Button variant="outline" size="sm">
                      Report
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-6 text-center">No recent analysis reports found.</p>
        )}
      </GlassCard>
    </div>
  );
};
