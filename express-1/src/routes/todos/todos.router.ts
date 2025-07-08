import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todos.controller";
import { hasValidId } from "../../common/middlewares/has-valid-id";

export const TODOS_ROUTE = "/todos";
export const todosRouter = Router();

todosRouter.get("/", getAllTodos);
todosRouter.get("/:id", [hasValidId], getTodoById);
todosRouter.post("/", createTodo);
todosRouter.put("/:id", [hasValidId], updateTodo);
todosRouter.delete("/:id", [hasValidId], deleteTodo);
