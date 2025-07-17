import { Request, Response, NextFunction } from 'express';
import { createTodo, getAllUserTodos, removeTodo } from './todo.service';

export const handleCreateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = req.body;
    const ownerId = res.locals.user.id;
    todo.owner = ownerId;
    const newTodo = await createTodo(todo);

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllUserTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const ownerId = res.locals.user.id;
    const todos = await getAllUserTodos(limit, page, ownerId);

    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const handleRemoveUserTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = res.locals.user.id;
    const todoId = req.params.id || '';
    await removeTodo(todoId, ownerId);

    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};
