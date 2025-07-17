import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { customCors } from './common/middlewares/custom-cors';
import { router } from './routes/router';
import { errorHandler } from './common/middlewares/error-handler';

const PORT = Number(process.env.PORT) || 3000;
const app = express();
app.use(customCors);
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL || '');
    console.log('MongoDB conncted');

    app.listen(PORT, () => {
      console.log('Started on', PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

run();
