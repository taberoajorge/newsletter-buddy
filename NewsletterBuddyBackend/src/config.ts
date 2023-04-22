declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      PORT: string;
      EMAIl_PROVIDER: string;
      EMAIl_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

const config = Object.freeze({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: parseInt(process.env.PORT, 10),
  SMTP: {
    PROVIDER: process.env.EMAIl_PROVIDER,
    USER: process.env.EMAIl_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
});

export default config;
