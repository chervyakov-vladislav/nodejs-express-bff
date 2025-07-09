import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todos.controller";
import { validateBodyTodo, validateParamId } from "./todos.validators";

export const TODOS_ROUTE = "/todos";
export const todosRouter = Router();

todosRouter.get("/", getAllTodos);
todosRouter.get("/:id", [validateParamId], getTodoById);
todosRouter.post("/", [validateBodyTodo], createTodo);
todosRouter.put("/:id", [validateParamId, validateBodyTodo], updateTodo);
todosRouter.delete("/:id", [validateParamId], deleteTodo);
