import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const UploadResume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!jobTitle.trim()) {
      setError('Target Job Title is required.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError('Target Job Description must be at least 20 characters.');
      return;
    }

    if (activeTab === 'upload' && !file) {
      setError('Please select a PDF, DOCX, or TXT file to upload.');
      return;
    }

    if (activeTab === 'paste' && (!rawText.trim() || rawText.trim().length < 20)) {
      setError('Pasted resume text must be at least 20 characters.');
      return;
    }

    setLoading(true);

    try {
      let extractedText = rawText;
      let resumeId: string | undefined = undefined;

      if (activeTab === 'upload' && file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', `${jobTitle} Resume`);

        const uploadRes = await api.post('/resume/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const savedResume = uploadRes.data.data;
        extractedText = savedResume.raw_text;
        resumeId = savedResume.id;
      }

      // Perform AI Analysis
      const analyzeRes = await api.post('/resume/analyze', {
        resumeId,
        rawText: activeTab === 'paste' ? rawText : undefined,
        jobTitle,
        targetCompany: targetCompany || undefined,
        jobDescription
      });

      const analysisData = analyzeRes.data.data;
      navigate(`/analysis/${analysisData.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white">Upload & Analyze Resume</h1>
        <p className="text-sm text-slate-400">
          Our Gemini AI engine will parse your resume, compare keywords against the job description, and calculate your ATS score.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Input Resume */}
        <GlassCard className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Resume Input Format
            </h2>
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'upload' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                File Upload
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'paste' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {activeTab === 'upload' ? (
            <div className="border-2 border-dashed border-slate-700/80 hover:border-brand-500/60 rounded-2xl p-8 text-center transition-colors bg-slate-900/40">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer space-y-3 block">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {file ? file.name : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX or TXT (Max 5MB)</p>
                </div>
                {file && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Parsing
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Paste Full Resume Text</label>
              <textarea
                rows={8}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your complete resume text here including work experience, skills, education, and achievements..."
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors font-mono"
              />
            </div>
          )}
        </GlassCard>

        {/* Step 2: Target Position Details */}
        <GlassCard className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Target Position Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Job Title *</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Company Name (Optional)</label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Stripe, OpenAI, Google"
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Job Description *</label>
            <textarea
              rows={6}
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full target job description including requirements, responsibilities, and key technologies..."
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-brand-500/60 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>
        </GlassCard>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            leftIcon={<Sparkles className="w-5 h-5 text-indigo-300" />}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            {loading ? 'AI Engine Auditing Resume...' : 'Start AI Analysis'}
          </Button>
        </div>
      </form>
    </div>
  );
};
