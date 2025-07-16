import { User, userModel } from './user.model';

export const createUser = async (user: User) => {
  const newUser = await userModel.create(user);

  return newUser;
};

export const getAllUsers = async () => {
  const users = await userModel.find();

  return users;
};

export const getUserById = async (id: string) => {
  const user = await userModel.findById(id).orFail();

  return user;
};

export const deleteUserById = async (id: string) => {
  const user = await userModel.findByIdAndDelete(id).orFail();

  return user;
};

export const updateUserById = async (id: string, userData: User) => {
  const user = await userModel
    .findByIdAndUpdate(id, userData, { new: true, runValidators: true })
    .orFail();

  return user;
};
