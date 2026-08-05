import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Trash2, ExternalLink, Calendar, Award, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ResumeAnalysis } from '../types';

export const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: history = [], isLoading } = useQuery<ResumeAnalysis[]>({
    queryKey: ['history', searchTerm],
    queryFn: async () => {
      const res = await api.get('/history', {
        params: { search: searchTerm || undefined }
      });
      return res.data.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this historical analysis report?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Analysis History</h1>
          <p className="text-sm text-slate-400 mt-1">
            Search and review all your previous resume audit reports and ATS keyword evaluations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search role, company or summary..."
            className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500/60 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          />
        </div>
      </div>

      <GlassCard className="space-y-4">
        {isLoading ? (
          <SkeletonLoader count={5} className="h-16 w-full" />
        ) : history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Target Role & Company</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">ATS Score</th>
                  <th className="p-3.5">Overall Score</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-sm text-slate-100">{item.job_title}</div>
                      {item.target_company && (
                        <div className="text-slate-400 font-medium">@ {item.target_company}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <Badge variant={item.ats_score >= 75 ? 'success' : item.ats_score >= 55 ? 'warning' : 'danger'}>
                        {item.ats_score}% Match
                      </Badge>
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-bold text-slate-200">
                      {item.overall_score} / 100
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      <Link to={`/analysis/${item.id}`}>
                        <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No Reports Found</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">Try adjusting your search filter or run a new resume audit.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
