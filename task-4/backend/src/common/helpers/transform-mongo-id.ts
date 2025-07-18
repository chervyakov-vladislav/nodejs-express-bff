import { Types } from 'mongoose';

export const transformId = (id: string) => {
  return new Types.ObjectId(id);
};
