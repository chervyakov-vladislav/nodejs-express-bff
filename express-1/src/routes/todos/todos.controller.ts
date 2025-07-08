import type { Request, Response } from "express";
import { NotFoundError } from "../../common/errors/not-found-error";

const todos = [
  { id: 1, title: "My todo 1", completed: false },
  { id: 2, title: "My todo 2", completed: false },
  { id: 3, title: "My todo 3", completed: false },
];

export const getAllTodos = async (req: Request, res: Response) => {
  res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) throw new NotFoundError();

  res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
  const newTodo = req.body;

  newTodo.id = (todos[todos.length - 1]?.id || 0) + 1;

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedTodo = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) throw new NotFoundError();

  todos[todoIndex] = updatedTodo;

  res.json(updatedTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) throw new NotFoundError();

  todos.splice(todoIndex, 1);

  res.status(200).send();
};
