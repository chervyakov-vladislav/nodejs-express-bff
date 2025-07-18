import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './common/middlewares/error-handler';
import { router } from './routes/router';

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL || '';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
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
