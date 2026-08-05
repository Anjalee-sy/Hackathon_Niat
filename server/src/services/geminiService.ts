import { ai, GEMINI_MODEL } from '../config/gemini';
import { buildResumeAnalysisPrompt, buildCoverLetterPrompt } from '../prompts/geminiPrompts';
import { ResumeAnalysisResult } from '../types';

export class GeminiService {
  static async analyzeResume(
    resumeText: string,
    jobTitle: string,
    jobDescription: string,
    targetCompany?: string
  ): Promise<ResumeAnalysisResult> {
    const prompt = buildResumeAnalysisPrompt(resumeText, jobTitle, jobDescription, targetCompany);

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    // Strip possible markdown fences if returned
    const cleanText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

    try {
      const parsed: ResumeAnalysisResult = JSON.parse(cleanText);
      
      // Ensure defaults for optional fields if missing
      return {
        overall_score: typeof parsed.overall_score === 'number' ? parsed.overall_score : 75,
        ats_score: typeof parsed.ats_score === 'number' ? parsed.ats_score : 70,
        summary: parsed.summary || 'Resume analyzed successfully.',
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
        missing_skills: Array.isArray(parsed.missing_skills) ? parsed.missing_skills : [],
        matched_skills: Array.isArray(parsed.matched_skills) ? parsed.matched_skills : [],
        grammar_issues: Array.isArray(parsed.grammar_issues) ? parsed.grammar_issues : [],
        formatting_issues: Array.isArray(parsed.formatting_issues) ? parsed.formatting_issues : [],
        section_recommendations: Array.isArray(parsed.section_recommendations) ? parsed.section_recommendations : [],
        recruiter_tips: Array.isArray(parsed.recruiter_tips) ? parsed.recruiter_tips : []
      };
    } catch (err) {
      console.error('🔥 Failed to parse Gemini JSON response:', cleanText);
      throw new Error('AI service returned invalid JSON structure.');
    }
  }

  static async generateCoverLetter(
    resumeText: string,
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    tone: string = 'Professional'
  ): Promise<string> {
    const prompt = buildCoverLetterPrompt(resumeText, jobTitle, companyName, jobDescription, tone);

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt
    });

    return response.text || '';
  }
}
