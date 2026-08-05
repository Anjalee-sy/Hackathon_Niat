import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Sparkles, Copy, Check, AlertCircle, Send, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const CoverLetterGenerator: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [rawText, setRawText] = useState('');
  const [tone, setTone] = useState<'Professional' | 'Enthusiastic' | 'Executive' | 'Creative'>('Professional');

  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!jobTitle.trim()) {
      setError('Job Title is required.');
      return;
    }
    if (!companyName.trim()) {
      setError('Company Name is required.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError('Job Description must be at least 20 characters.');
      return;
    }
    if (!rawText.trim() || rawText.trim().length < 20) {
      setError('Please provide your resume content (at least 20 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/cover-letter', {
        jobTitle,
        companyName,
        jobDescription,
        rawText,
        tone
      });

      setCoverLetter(res.data.data.content);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to generate cover letter.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">AI Cover Letter Generator</h1>
        <p className="text-sm text-slate-400">
          Generate tailored, high-converting Markdown cover letters aligned with target job requirements.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <GlassCard className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-purple-400" /> Cover Letter Options
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Lead Frontend Architect"
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. OpenAI"
                  className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tone of Voice</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Professional', 'Enthusiastic', 'Executive', 'Creative'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      tone === t
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Job Description *</label>
              <textarea
                rows={4}
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key responsibilities and requirements..."
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500/60 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Your Resume Content *</label>
              <textarea
                rows={5}
                required
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your work experience, skills, and background..."
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-purple-500/60 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors font-mono"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 shadow-lg shadow-purple-500/20"
              isLoading={loading}
              leftIcon={<Sparkles className="w-5 h-5 text-white" />}
            >
              Generate Cover Letter
            </Button>
          </form>
        </GlassCard>

        {/* Output Preview */}
        <GlassCard className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-400" /> Markdown Output Preview
              </h2>
              {coverLetter && (
                <Button variant="outline" size="sm" onClick={handleCopy} leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}>
                  {copied ? 'Copied!' : 'Copy Markdown'}
                </Button>
              )}
            </div>

            {coverLetter ? (
              <div className="mt-4 p-6 rounded-xl bg-slate-900/80 border border-slate-800 font-sans text-sm text-slate-200 leading-relaxed prose prose-invert max-w-none max-h-[500px] overflow-y-auto">
                <ReactMarkdown>{coverLetter}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl my-4">
                <FileText className="w-12 h-12 text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">No Cover Letter Generated Yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">Fill out target details on the left and click Generate.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
