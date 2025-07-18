import { userModel } from './user.model';

export const createUser = async (email: string, password: string) => {
  const data = await userModel.createSafe({ email, password });
  const token = data.generateAccessToken();

  return {
    token,
    id: data._id,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await userModel.findUserByCredentials(email, password);
  const accessToken = user.generateAccessToken();

  return accessToken;
};
