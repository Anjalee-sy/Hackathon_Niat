import React from 'react';
import { Settings as SettingsIcon, ShieldCheck, Cpu, Moon, Bell } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="text-sm text-slate-400">Configure AI engine preferences and security parameters.</p>
      </div>

      <GlassCard className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Cpu className="w-5 h-5 text-brand-400" /> AI Engine Configuration
        </h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <p className="font-bold text-slate-200">Google Gemini GenAI Model</p>
              <p className="text-slate-400 mt-0.5">Primary LLM engine for structured JSON resume audits</p>
            </div>
            <Badge variant="success">gemini-2.5-flash</Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <p className="font-bold text-slate-200">Strict JSON Validation</p>
              <p className="text-slate-400 mt-0.5">Enforces Zod response verification on all AI requests</p>
            </div>
            <Badge variant="info">Enabled</Badge>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Moon className="w-5 h-5 text-purple-400" /> Interface Preference
        </h2>

        <div className="flex items-center justify-between text-xs p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div>
            <p className="font-bold text-slate-200">Dark Mode Theme</p>
            <p className="text-slate-400 mt-0.5">OpenAI/Linear inspired glassmorphic aesthetic</p>
          </div>
          <Badge variant="purple">Dark Mode Default</Badge>
        </div>
      </GlassCard>
    </div>
  );
};
