import { Error as MongooseError } from 'mongoose';
import { NotFoundError } from '../../common/errors/not-found-error';
import { User, userModel } from './user.model';
import { transformError } from '../../common/errors/error-helpers';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { ConflictError } from '../../common/errors/conflict-error';

export const getAllUsers = async (limit: number, page: number) => {
  const [users, total] = await Promise.all([
    userModel
      .find()
      .sort({ email: 1 })
      .limit(limit)
      .skip((page - 1) * limit),
    userModel.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data: users,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getUserById = async (id: string) => {
  try {
    const user = await userModel
      .findById(id)
      .select('+password')
      .orFail(() => new NotFoundError('User does not exist'));

    return user;
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError();
    }

    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const user = await userModel
      .findByIdAndDelete(id)
      .orFail(() => new NotFoundError('User does not exist'));

    return user;
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError();
    }

    throw error;
  }
};

export const updateUserById = async (id: string, userData: User) => {
  try {
    const user = await userModel
      .findByIdAndUpdate(id, userData, { new: true, runValidators: true })
      .orFail(() => new NotFoundError('User does not exist'));

    return user;
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError();
    }

    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      throw new BadRequestError(errors[0].message);
    }

    if (error instanceof Error && error.message.startsWith('E11000')) {
      throw new ConflictError('Email should be unique');
    }

    throw error;
  }
};
