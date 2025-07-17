import { Error as MongooseError } from 'mongoose';
import { Todo, todoModel } from './todo.model';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { NotFoundError } from '../../common/errors/not-found-error';

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

export const getAllUserTodos = async (
  limit: number,
  page: number,
  ownerId: string,
) => {
  const [todos, total] = await Promise.all([
    todoModel
      .find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('owner'),
    todoModel.countDocuments({ owner: ownerId }),
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

export const removeTodo = async (todoId: string, ownerId: string) => {
  try {
    await todoModel.deleteOne({ owner: ownerId, _id: todoId }).orFail();
  } catch (error) {
    console.log(error);
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError();
    }

    if (error instanceof MongooseError.DocumentNotFoundError) {
      throw new NotFoundError();
    }

    throw error;
  }
};
