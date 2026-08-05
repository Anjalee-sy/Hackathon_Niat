import React from 'react';
import { User as UserIcon, Mail, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">User Profile</h1>
        <p className="text-sm text-slate-400">Manage your account information and subscription tier status.</p>
      </div>

      <GlassCard glow="blue" className="space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-500/25">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {user?.user_metadata?.full_name || 'ResuMind AI Candidate'}
            </h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success">Pro Plan Active</Badge>
              <Badge variant="info">Verified Account</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-400" /> Account Email
            </span>
            <p className="font-semibold text-slate-200">{user?.email}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" /> Joined Date
            </span>
            <p className="font-semibold text-slate-200">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Active User'}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
