import dotenv from 'dotenv';
dotenv.config({ path: './backend.env' });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      PORT: string;
      EMAIL_PROVIDER: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

const config = Object.freeze({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  SMTP: {
    PROVIDER: process.env.EMAIL_PROVIDER,
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
});


export default config;
