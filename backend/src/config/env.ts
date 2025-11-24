import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    url: process.env.DATABASE_URL || '',
  },
  
  llm: {
    provider: process.env.LLM_PROVIDER || 'google', // 'openai' or 'google'
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY || 'Enter_your_Google_API_key',
      model: process.env.GOOGLE_MODEL || 'gemini-1.5-pro',
    },
  },
  
  diagram: {
    plantumlServerUrl: process.env.PLANTUML_SERVER_URL || 'http://localhost:8080',
    uploadsDir: process.env.UPLOADS_DIR || './uploads/diagrams',
  },
  
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'change-this-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  },
};
