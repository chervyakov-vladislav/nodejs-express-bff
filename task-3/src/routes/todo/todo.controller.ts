import { Request, Response, NextFunction } from 'express';
import { createTodo, getAllTodos } from './todo.service';

export const handleCreateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = req.body;

    todo.owner = '687745524b6f6d5745070b8c';

    const newTodo = await createTodo(todo);

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todos = await getAllTodos();

    res.json(todos);
  } catch (error) {
    next(error);
  }
};
