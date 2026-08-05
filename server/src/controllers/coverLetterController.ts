import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { GeminiService } from '../services/geminiService';
import { SupabaseService } from '../services/supabaseService';
import { generateCoverLetterSchema } from '../schemas/validationSchemas';

export class CoverLetterController {
  static async generate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const validatedData = generateCoverLetterSchema.parse(req.body);

      let resumeText = validatedData.rawText || '';
      let resumeId = validatedData.resumeId || null;

      if (resumeId) {
        const resume = await SupabaseService.getResumeById(userId, resumeId);
        resumeText = resume.raw_text;
      }

      const markdownContent = await GeminiService.generateCoverLetter(
        resumeText,
        validatedData.jobTitle,
        validatedData.companyName,
        validatedData.jobDescription,
        validatedData.tone
      );

      const savedCoverLetter = await SupabaseService.saveCoverLetter(
        userId,
        resumeId,
        null,
        validatedData.companyName,
        validatedData.jobTitle,
        validatedData.jobDescription,
        markdownContent,
        validatedData.tone
      );

      return res.status(200).json({
        success: true,
        data: savedCoverLetter
      });
    } catch (err) {
      next(err);
    }
  }
}
