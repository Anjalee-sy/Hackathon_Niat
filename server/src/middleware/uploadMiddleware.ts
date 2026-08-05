import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain'
  ];

  if (allowedMimeTypes.includes(file.mimetype) || file.originalname.endsWith('.pdf') || file.originalname.endsWith('.docx') || file.originalname.endsWith('.txt')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.'));
  }
};

export const uploadSingleResume = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  },
  fileFilter
}).single('file');
