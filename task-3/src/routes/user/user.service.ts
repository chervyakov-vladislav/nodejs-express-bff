import { User, userModel } from './user.model';

export const createUser = async (user: User) => {
  const newUser = await userModel.create(user);

  return newUser;
};

export const getAllUsers = async () => {
  const users = await userModel.find();

  return users;
};
