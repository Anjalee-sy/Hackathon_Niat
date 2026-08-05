import { z } from 'zod';

export const analyzeResumeSchema = z.object({
  resumeId: z.string().uuid().optional(),
  title: z.string().min(1, 'Resume title is required').optional(),
  rawText: z.string().min(20, 'Resume content must be at least 20 characters').optional(),
  jobTitle: z.string().min(2, 'Target job title is required'),
  targetCompany: z.string().optional(),
  jobDescription: z.string().min(20, 'Job description must be at least 20 characters')
}).refine(data => data.resumeId || data.rawText, {
  message: 'Either resumeId or rawText must be provided',
  path: ['rawText']
});

export const uploadResumeSchema = z.object({
  title: z.string().min(1, 'Resume title is required'),
  rawText: z.string().min(20, 'Resume text is required')
});

export const generateCoverLetterSchema = z.object({
  resumeId: z.string().uuid().optional(),
  rawText: z.string().min(20, 'Resume content must be at least 20 characters').optional(),
  jobTitle: z.string().min(2, 'Job title is required'),
  companyName: z.string().min(2, 'Company name is required'),
  jobDescription: z.string().min(20, 'Job description must be at least 20 characters'),
  tone: z.enum(['Professional', 'Enthusiastic', 'Executive', 'Creative']).default('Professional')
}).refine(data => data.resumeId || data.rawText, {
  message: 'Either resumeId or rawText must be provided',
  path: ['rawText']
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid analysis ID format')
});
