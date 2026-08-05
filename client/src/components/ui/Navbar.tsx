import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, User as UserIcon, LayoutDashboard, FileText, Upload, History, ScrollText, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-brand-400">
            ResuMind <span className="text-brand-500 font-extrabold text-sm uppercase px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">AI</span>
          </span>
        </Link>

        {/* Dynamic User Navigation */}
        <nav className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4 text-brand-400" />}>
                  Dashboard
                </Button>
              </Link>

              <Link to="/upload">
                <Button variant="primary" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                  New Audit
                </Button>
              </Link>

              <div className="h-4 w-[1px] bg-slate-800 mx-1" />

              <div className="flex items-center gap-2">
                <Link to="/profile" className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
                  <UserIcon className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
