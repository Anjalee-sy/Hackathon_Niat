import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import coverLetterRoutes from './routes/coverLetterRoutes';
import historyRoutes from './routes/historyRoutes';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: [env.CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Rate limiter (100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api/', apiLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/v1/health', (_req, res) => {
  return res.json({
    status: 'ok',
    service: 'ResuMind AI API Server',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/resume', resumeRoutes);
app.use('/api/v1/cover-letter', coverLetterRoutes);
app.use('/api/v1/history', historyRoutes);

// Fallback for 404 routes
app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    error: 'API Endpoint Not Found'
  });
});

// Central Error Handler
app.use(errorHandler);

export default app;
