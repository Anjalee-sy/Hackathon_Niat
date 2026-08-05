import { supabaseAdmin } from '../config/supabase';
import { ResumeAnalysisResult } from '../types';

export class SupabaseService {
  static async saveResume(
    userId: string,
    title: string,
    rawText: string,
    fileName?: string,
    fileType: 'pdf' | 'docx' | 'txt' | 'pasted' = 'pasted'
  ) {
    const { data, error } = await supabaseAdmin
      .from('resumes')
      .insert({
        user_id: userId,
        title,
        raw_text: rawText,
        file_name: fileName || null,
        file_type: fileType
      })
      .select()
      .single();

    if (error) {
      console.error('Database Error saving resume:', error);
      throw new Error(`Failed to save resume record: ${error.message}`);
    }

    return data;
  }

  static async saveAnalysis(
    userId: string,
    resumeId: string | null,
    jobTitle: string,
    targetCompany: string | null,
    jobDescription: string,
    analysis: ResumeAnalysisResult
  ) {
    const { data, error } = await supabaseAdmin
      .from('resume_analyses')
      .insert({
        user_id: userId,
        resume_id: resumeId,
        job_title: jobTitle,
        target_company: targetCompany || null,
        job_description: jobDescription,
        overall_score: analysis.overall_score,
        ats_score: analysis.ats_score,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missing_skills: analysis.missing_skills,
        matched_skills: analysis.matched_skills,
        grammar_issues: analysis.grammar_issues,
        formatting_issues: analysis.formatting_issues,
        section_recommendations: analysis.section_recommendations,
        recruiter_tips: analysis.recruiter_tips
      })
      .select()
      .single();

    if (error) {
      console.error('Database Error saving analysis:', error);
      throw new Error(`Failed to save analysis record: ${error.message}`);
    }

    return data;
  }

  static async saveCoverLetter(
    userId: string,
    resumeId: string | null,
    analysisId: string | null,
    companyName: string,
    jobTitle: string,
    jobDescription: string,
    content: string,
    tone: string = 'Professional'
  ) {
    const { data, error } = await supabaseAdmin
      .from('cover_letters')
      .insert({
        user_id: userId,
        resume_id: resumeId,
        analysis_id: analysisId,
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDescription,
        content,
        tone
      })
      .select()
      .single();

    if (error) {
      console.error('Database Error saving cover letter:', error);
      throw new Error(`Failed to save cover letter: ${error.message}`);
    }

    return data;
  }

  static async getHistory(userId: string, search?: string, limit: number = 20) {
    let query = supabaseAdmin
      .from('resume_analyses')
      .select('id, job_title, target_company, overall_score, ats_score, summary, created_at, resume_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (search) {
      query = query.or(`job_title.ilike.%${search}%,target_company.ilike.%${search}%,summary.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database Error fetching history:', error);
      throw new Error(`Failed to fetch history: ${error.message}`);
    }

    return data || [];
  }

  static async getAnalysisById(userId: string, analysisId: string) {
    const { data, error } = await supabaseAdmin
      .from('resume_analyses')
      .select('*')
      .eq('id', analysisId)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Database Error fetching analysis by ID:', error);
      throw new Error(`Analysis record not found: ${error.message}`);
    }

    return data;
  }

  static async getResumeById(userId: string, resumeId: string) {
    const { data, error } = await supabaseAdmin
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(`Resume record not found: ${error.message}`);
    }

    return data;
  }

  static async deleteAnalysis(userId: string, analysisId: string) {
    const { error } = await supabaseAdmin
      .from('resume_analyses')
      .delete()
      .eq('id', analysisId)
      .eq('user_id', userId);

    if (error) {
      console.error('Database Error deleting analysis:', error);
      throw new Error(`Failed to delete analysis record: ${error.message}`);
    }

    return true;
  }
}
