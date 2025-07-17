import { Schema, Document, model, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NotAuthorizedError } from '../../common/errors/not-authorized-error';

export interface User {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => string;
}

export interface UserDoc extends Document, User {}

interface UserModel extends Model<UserDoc> {
  findByCredentials: (
    email: string,
    password: string,
  ) => Promise<UserDoc | never>;
}

const userSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
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
      trim: true,
      minlength: [6, 'min simbols in password - 6'],
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
  },
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);

      this.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (error) {
    if (error instanceof Error) next(error);
  }
});

// userSchema.post('save', async function (doc, next) {
//   console.log('User created|update', doc);
//   next();
// });
// userSchema.pre('find', function (next) {
//   console.log('find user', this.getQuery());
//   next();
// });

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, String(process.env.JWT_SECRET), {
    expiresIn: '15m',
  });
};
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(
      () => new NotAuthorizedError('User with provided credentials not found'),
    );

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new NotAuthorizedError('User with provided credentials not found');
  }

  return user;
};

export const userModel = model<UserDoc, UserModel>('user', userSchema);
