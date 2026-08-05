import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export class ParserService {
  static async extractTextFromFile(buffer: Buffer, originalName: string, mimeType: string): Promise<{ text: string; fileType: 'pdf' | 'docx' | 'txt' }> {
    const ext = originalName.split('.').pop()?.toLowerCase() || '';

    if (mimeType === 'application/pdf' || ext === 'pdf') {
      const data = await pdfParse(buffer);
      const cleaned = data.text.replace(/\r\n/g, '\n').trim();
      return { text: cleaned, fileType: 'pdf' };
    }

    if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword' ||
      ext === 'docx' ||
      ext === 'doc'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return { text: result.value.trim(), fileType: 'docx' };
    }

    if (mimeType === 'text/plain' || ext === 'txt') {
      return { text: buffer.toString('utf-8').trim(), fileType: 'txt' };
    }

    throw new Error(`Unsupported file type: ${originalName}`);
  }
}
