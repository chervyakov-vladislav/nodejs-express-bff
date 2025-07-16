import { Router } from 'express';
import { handleCreateTodo, handleGetAllTodos } from './todo.controller';

export const TODOS_ROUTE = '/todos';
export const todosRouter = Router();

todosRouter.post('/', handleCreateTodo);
todosRouter.get('/', handleGetAllTodos);
// todosRouter.get('/:id');
// todosRouter.delete('/:id');
// todosRouter.patch('/:id');
