import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileCheck,
  Award,
  FileText,
  History as HistoryIcon,
  User,
  Settings as SettingsIcon,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload & Parse', path: '/upload', icon: Upload },
    { label: 'ATS Analysis', path: '/ats-report', icon: Award },
    { label: 'Cover Letter', path: '/cover-letter', icon: FileText },
    { label: 'History', path: '/history', icon: HistoryIcon },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: SettingsIcon }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Navigation</p>
        </div>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30 shadow-lg shadow-brand-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-brand-950/40 to-indigo-950/40 border border-brand-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-bold text-slate-200">Gemini 2.5 Flash</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Powered by Google GenAI SDK for instant ATS compatibility audits.
        </p>
      </div>
    </aside>
  );
};
