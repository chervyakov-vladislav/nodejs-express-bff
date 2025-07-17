import { Error as MongooseError } from 'mongoose';
import { transformError } from '../../common/errors/error-helpers';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { ConflictError } from '../../common/errors/conflict-error';
import { User, userModel } from '../user/user.model';

export const createUser = async (user: User) => {
  try {
    const newUser = await userModel.create(user);
    const token = newUser.generateToken();

    return token;
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

export const logInUser = async (email: string, password: string) => {
  try {
    const user = await userModel.findByCredentials(email, password);
    const token = user.generateToken();

    return token;
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
