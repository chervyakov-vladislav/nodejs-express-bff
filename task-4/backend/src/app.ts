import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { errorHandler } from './common/middlewares/error-handler';
import { router } from './routes/router';
import { errorLogger, requestLogger } from './common/middlewares/logger';

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL || '';

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    xPoweredBy: false,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log('Started on', PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
