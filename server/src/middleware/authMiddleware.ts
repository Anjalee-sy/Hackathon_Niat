import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { supabaseAdmin } from '../config/supabase';

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Missing or invalid Authorization bearer token'
      });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired token'
      });
    }

    req.user = {
      id: user.id,
      email: user.email || ''
    };

    next();
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'Authentication verification failure',
      details: err.message
    });
  }
};
