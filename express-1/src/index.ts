import "dotenv/config";
import path from "node:path";
import express from "express";
import { router } from "./routes/router";
import { errorHandler } from "./common/middlewares/error-handler";
import { customCors } from "./common/middlewares/custom-cors";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

app.use(customCors);
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "..", "public")));
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
