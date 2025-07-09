import express from 'express';
import cors from 'cors';

import { router } from './routes/router';

const PORT = 3000;
const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Start: http://localhost:${PORT}`);
});
