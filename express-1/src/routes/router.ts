import { Request, Response, Router } from "express";
import { TODOS_ROUTE, todosRouter } from "./todos/todos.router";

export const router = Router();

router.use(TODOS_ROUTE, todosRouter);

router.all("*all", (req: Request, res: Response) => {
  res.status(404).json({ message: "not found" });
});
