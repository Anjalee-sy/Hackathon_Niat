import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

export interface ResumeAnalysisResult {
  overall_score: number;
  ats_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  matched_skills: string[];
  grammar_issues: Array<{
    original: string;
    correction: string;
    reason: string;
  }>;
  formatting_issues: string[];
  section_recommendations: Array<{
    section: string;
    current_assessment: string;
    recommendation: string;
    example_improvement: string;
  }>;
  recruiter_tips: string[];
}
