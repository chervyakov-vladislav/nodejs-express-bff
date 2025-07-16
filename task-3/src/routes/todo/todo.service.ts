import { Todo, todoModel } from './todo.model';

export const createTodo = async (todo: Todo) => {
  const newTodo = await todoModel.create(todo);

  return newTodo;
};

export const getAllTodos = async () => {
  const todos = await todoModel.find().populate('owner');

  return todos;
};
