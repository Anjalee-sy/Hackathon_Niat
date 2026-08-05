import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { ParserService } from '../services/parserService';
import { GeminiService } from '../services/geminiService';
import { SupabaseService } from '../services/supabaseService';
import { analyzeResumeSchema, uploadResumeSchema } from '../schemas/validationSchemas';

export class ResumeController {
  static async upload(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      if (req.file) {
        const { text, fileType } = await ParserService.extractTextFromFile(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );

        const title = req.body.title || req.file.originalname.replace(/\.[^/.]+$/, '');
        const savedResume = await SupabaseService.saveResume(
          userId,
          title,
          text,
          req.file.originalname,
          fileType
        );

        return res.status(201).json({
          success: true,
          data: savedResume
        });
      }

      // Handle raw text submission via JSON body
      const parsedBody = uploadResumeSchema.parse(req.body);
      const savedResume = await SupabaseService.saveResume(
        userId,
        parsedBody.title,
        parsedBody.rawText,
        undefined,
        'pasted'
      );

      return res.status(201).json({
        success: true,
        data: savedResume
      });
    } catch (err) {
      next(err);
    }
  }

  static async analyze(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const validatedData = analyzeResumeSchema.parse(req.body);

      let resumeText = validatedData.rawText || '';
      let resumeId = validatedData.resumeId || null;

      // If resumeId provided, fetch raw text from DB
      if (resumeId) {
        const resume = await SupabaseService.getResumeById(userId, resumeId);
        resumeText = resume.raw_text;
      } else if (resumeText) {
        // Automatically save pasted raw text as a resume entry for history consistency
        const title = `${validatedData.jobTitle} Resume (${new Date().toLocaleDateString()})`;
        const saved = await SupabaseService.saveResume(userId, title, resumeText, undefined, 'pasted');
        resumeId = saved.id;
      }

      // Perform Gemini AI structured analysis
      const analysisResult = await GeminiService.analyzeResume(
        resumeText,
        validatedData.jobTitle,
        validatedData.jobDescription,
        validatedData.targetCompany
      );

      // Persist analysis in Supabase PostgreSQL
      const savedAnalysis = await SupabaseService.saveAnalysis(
        userId,
        resumeId,
        validatedData.jobTitle,
        validatedData.targetCompany || null,
        validatedData.jobDescription,
        analysisResult
      );

      return res.status(200).json({
        success: true,
        data: savedAnalysis
      });
    } catch (err) {
      next(err);
    }
  }
}
