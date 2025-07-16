import { Error } from 'mongoose';

const codeMongoDbError = 'E1100';

export const transformError = (error: Error.ValidationError) => {
  return Object.values(error.errors).map((err) => ({ message: err.message }));
};
