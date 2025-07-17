import { Router } from 'express';
import {
  handleCreateTodo,
  handleGetAllUserTodos,
  handleRemoveUserTodo,
} from './todo.controller';

export const TODOS_ROUTE = '/todos';
export const todosRouter = Router();

todosRouter.post('/', handleCreateTodo);
todosRouter.get('/', handleGetAllUserTodos);
todosRouter.delete('/:id', handleRemoveUserTodo);
