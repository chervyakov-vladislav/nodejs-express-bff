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

export const getAllTodos = async (limit: number, page: number) => {
  const [todos, total] = await Promise.all([
    todoModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('owner'),
    todoModel.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data: todos,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
