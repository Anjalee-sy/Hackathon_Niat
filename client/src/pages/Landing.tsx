import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, Target, FileText, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';

export const Landing: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Resume Assistant
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Bypass ATS Algorithms. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">
            Land 3x More Interviews.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          ResuMind AI analyzes your resume against target job descriptions, calculates exact ATS match scores, highlights missing keywords, and writes tailored cover letters in seconds.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Analyze Resume Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Live Demo & Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Credit Card Required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant PDF & DOCX Parsing
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Google Gemini Powered
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Engineered for High-Impact Job Applications</h2>
          <p className="text-slate-400 mt-2">Comprehensive suite of AI tools designed by recruiters and software architects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hoverable glow="blue" className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">ATS Compatibility Engine</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Get an accurate 0–100 compatibility score showing how ATS resume scanners extract and rank your profile against target roles.
            </p>
          </GlassCard>

          <GlassCard hoverable glow="purple" className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Skills Gap & Keyword Auditor</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instantly discover missing technical skills, domain terms, and critical keywords required by automated recruiting filters.
            </p>
          </GlassCard>

          <GlassCard hoverable className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Tailored Cover Letter Generator</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generate customizable Markdown cover letters formatted specifically to highlight your accomplishments for each application.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4">
        <GlassCard className="p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Workflow</span>
            <h2 className="text-3xl font-bold text-white mt-1">4 Simple Steps to Your Dream Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">1</div>
              <h4 className="text-lg font-semibold text-white">Upload Resume</h4>
              <p className="text-xs text-slate-400">Drag & drop your PDF, DOCX, or paste raw text content.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">2</div>
              <h4 className="text-lg font-semibold text-white">Add Job Details</h4>
              <p className="text-xs text-slate-400">Paste target job title and job description for exact alignment.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">3</div>
              <h4 className="text-lg font-semibold text-white">AI Analysis & Scoring</h4>
              <p className="text-xs text-slate-400">Receive ATS scores, grammar checks, and section improvements.</p>
            </div>
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">4</div>
              <h4 className="text-lg font-semibold text-white">Export & Apply</h4>
              <p className="text-xs text-slate-400">Apply confidently with optimized resumes and custom cover letters.</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <GlassCard glow="blue" className="py-12 px-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to Boost Your Interview Callback Rate?</h2>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto text-sm">
            Join candidates who use ResuMind AI to land top engineering, product, and management roles.
          </p>
          <div className="mt-6">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Free Now
              </Button>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
