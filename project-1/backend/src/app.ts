import express from 'express';
import cors from 'cors';

import { router } from './routes/router';
import { errorHandler } from './common/middlewares/error-handler';

const PORT = 3000;
const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
