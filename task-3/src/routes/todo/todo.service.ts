import { Error as MongooseError } from 'mongoose';
import { Todo, todoModel } from './todo.model';
import { BadRequestError } from '../../common/errors/bad-request-error';

export const createTodo = async (todo: Todo) => {
  try {
    const newTodo = await todoModel.create(todo);

    return newTodo;
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      throw new BadRequestError();
    }

    throw error;
  }
};

export const getAllTodos = async () => {
  const todos = await todoModel.find().populate('owner');

  return todos;
};
