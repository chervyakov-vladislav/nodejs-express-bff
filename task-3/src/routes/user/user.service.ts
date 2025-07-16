import { Error as MongooseError } from 'mongoose';
import { NotFoundError } from '../../common/errors/not-found-error';
import { User, userModel } from './model/user.model';
import { transformError } from './model/model.error-helpers';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { ConflictError } from '../../common/errors/conflict-error';

export const createUser = async (user: User) => {
  try {
    const newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
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

export const getAllUsers = async () => {
  const users = await userModel.find();

  return users;
};

export const getUserById = async (id: string) => {
  try {
    const user = await userModel
      .findById(id)
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
