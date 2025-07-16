import { Schema, Document, model, Model } from 'mongoose';

export interface User {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => void;
}

export interface UserDoc extends Document, User {}

interface UserModel extends Model<UserDoc> {
  findByCredentials: (email: string, password: string) => void;
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
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   // hash password
//   console.log('Pre save hook');
//   next();
// });
// userSchema.post('save', async function (doc, next) {
//   console.log('User created|update', doc);
//   next();
// });
// userSchema.pre('find', function (next) {
//   console.log('find user', this.getQuery());
//   next();
// });

userSchema.methods.generateToken = function () {};
userSchema.statics.findBySomething = async function (email, password) {};

export const userModel = model<UserDoc, UserModel>('user', userSchema);
