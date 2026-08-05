export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  raw_text: string;
  file_name?: string;
  file_type: 'pdf' | 'docx' | 'txt' | 'pasted';
  file_url?: string;
  created_at: string;
}

export interface GrammarIssue {
  original: string;
  correction: string;
  reason: string;
}

export interface SectionRecommendation {
  section: string;
  current_assessment: string;
  recommendation: string;
  example_improvement: string;
}

export interface ResumeAnalysis {
  id: string;
  user_id: string;
  resume_id?: string;
  job_title: string;
  target_company?: string;
  job_description: string;
  overall_score: number;
  ats_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  matched_skills: string[];
  grammar_issues: GrammarIssue[];
  formatting_issues: string[];
  section_recommendations: SectionRecommendation[];
  recruiter_tips: string[];
  created_at: string;
}

export interface CoverLetter {
  id: string;
  user_id: string;
  resume_id?: string;
  company_name: string;
  job_title: string;
  job_description: string;
  content: string;
  tone: string;
  created_at: string;
}
