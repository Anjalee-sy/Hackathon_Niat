import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { SupabaseService } from '../services/supabaseService';
import { idParamSchema } from '../schemas/validationSchemas';

export class HistoryController {
  static async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const search = req.query.search as string | undefined;

      const history = await SupabaseService.getHistory(userId, search);

      return res.status(200).json({
        success: true,
        data: history
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAnalysisById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = idParamSchema.parse(req.params);

      const analysis = await SupabaseService.getAnalysisById(userId, id);

      return res.status(200).json({
        success: true,
        data: analysis
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAnalysis(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = idParamSchema.parse(req.params);

      await SupabaseService.deleteAnalysis(userId, id);

      return res.status(200).json({
        success: true,
        message: 'Analysis report successfully deleted'
      });
    } catch (err) {
      next(err);
    }
  }
}
