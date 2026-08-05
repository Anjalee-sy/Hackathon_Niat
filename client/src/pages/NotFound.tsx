import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <GlassCard glow="blue" className="p-12 text-center max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <p className="text-lg font-semibold text-slate-200">Page Not Found</p>
          <p className="text-xs text-slate-400">The page you are looking for doesn't exist or has been moved.</p>
        </div>
        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </GlassCard>
    </div>
  );
};
