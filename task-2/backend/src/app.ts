import express from 'express';
import cors from 'cors';

import { router } from './routes/router';
import { errorHandler } from './common/middlewares/error-handler';
import { initRedis } from './common/redis/redis-client';

const PORT = 3000;
const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorHandler);

const run = async () => {
  try {
    await initRedis();

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Error on server init\n', error);
  }
};

run();
