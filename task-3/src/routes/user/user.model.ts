import { Schema, Document, model, Model } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);

export const userModel: Model<User> = model('user', userSchema);
