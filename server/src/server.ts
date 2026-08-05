import app from './app';
import { env } from './config/env';

const PORT = parseInt(env.PORT, 10) || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResuMind AI Server listening on port ${PORT} [${env.NODE_ENV}]`);
  console.log(`🔗 Health check available at http://localhost:${PORT}/api/v1/health`);
});
