import dotenv from 'dotenv';
dotenv.config({ path: './backend.env' });
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { readFile } from 'fs/promises';
import config from './lib/config.js';
import recipientsRoutes from './routes/recipients-routes.js';
import { Request } from 'express';
import sequelize from './lib/db.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();

const mailerTransport = nodemailer.createTransport({
  host: config.SMTP.PROVIDER,
  port: 587,
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASSWORD,
  },
});

interface CustomRequest extends Request {
  mailer: any;
}

app.use((req: CustomRequest, res, next) => {
  req.mailer = mailerTransport;
  next();
});

app.get("/", async (req, res) => {
  try {
    const file = await readFile("index.html");
    res.type("text/html").send(file);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.use('/api', recipientsRoutes);

sequelize.sync().then(() => {
  console.log('Connection to the established database and synchronized models.');
  app.listen(config.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port ${config.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Connection with the database could not be established:', err);
});
