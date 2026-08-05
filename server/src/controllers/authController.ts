import { Response } from 'express';
import { AuthenticatedRequest } from '../types';

export class AuthController {
  static async getMe(req: AuthenticatedRequest, res: Response) {
    return res.json({
      success: true,
      user: req.user
    });
  }
}
