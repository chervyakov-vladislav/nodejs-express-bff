import { Model, Schema, model, Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { transformError } from '../../common/helpers/transform-error';
import BadRequestError from '../../common/errors/bad-request-error';
import { ErrorCode } from '../../common/constants/error';
import Conflict from '../../common/errors/conflict-error';
import NotAuthorizedError from '../../common/errors/not-authorized-error';

interface User {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  generateAccessToken(): string;
}

export interface UserDoc extends Document, User {
  _id: string;
}
interface UserModel extends Model<UserDoc> {
  findUserByCredentials(
    email: string,
    password: string
  ): Promise<UserDoc | never>;
  createSafe(data: Partial<User>): Promise<UserDoc>;
  updateSafe(id: string, data: Partial<User>): Promise<UserDoc>;
  deleteSafe(id: string): Promise<UserDoc>;
  findByIdSafe(id: string): Promise<UserDoc>;
  findSafe(query: object): Promise<UserDoc[]>;
}

const userSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      validate: {
        validator: (value: string) => {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
          return passwordRegex.test(value);
        },
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      },
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;

        return ret;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);

      this.password = await bcrypt.hash(this.password, salt);
    }
  } catch (error) {
    if (error instanceof Error) next(error);
  }
});

userSchema.methods.generateAccessToken = function () {
  const JWT_SECRET = process.env.JWT_SECRET || '';

  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: '2h',
  });
};

userSchema.statics.createSafe = async function (data: User): Promise<UserDoc> {
  try {
    const doc = new this(data);
    const savedDoc = await doc.save();

    return savedDoc;
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);

      throw new BadRequestError(errors[0].message);
    }

    if (error instanceof Error && error.message.startsWith(ErrorCode.UNIQUE)) {
      throw new Conflict('User with this email is already exists');
    }

    throw error;
  }
};

userSchema.statics.updateSafe = async function (
  id: string,
  data: Partial<User>
): Promise<UserDoc> {
  try {
    const updatedDoc = await this.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
      select: '-password',
    });

    if (!updatedDoc) {
      throw new BadRequestError('User not found');
    }

    return updatedDoc;
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      throw new BadRequestError(errors[0].message);
    }
    throw error;
  }
};

userSchema.statics.deleteSafe = async function (id: string): Promise<UserDoc> {
  const deletedDoc = await this.findByIdAndDelete(id);
  if (!deletedDoc) {
    throw new BadRequestError('User not found');
  }
  return deletedDoc;
};

userSchema.statics.findByIdSafe = async function (
  id: string
): Promise<UserDoc> {
  const doc = await this.findById(id).select('-password');
  if (!doc) {
    throw new BadRequestError('User not found');
  }
  return doc;
};

userSchema.statics.findSafe = async function (
  query: object
): Promise<UserDoc[]> {
  return this.find(query).select('-password');
};

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const doc = await this.findOne({ email })
    .select('+password')
    .orFail(() => new NotAuthorizedError('User not found'));

  const isCorrectPassword = await bcrypt.compare(password, doc.password);

  if (!isCorrectPassword) {
    throw new NotAuthorizedError('Invalid credentials');
  }
  delete doc.password;

  return doc;
};

export const userModel = model<UserDoc, UserModel>('user', userSchema);
