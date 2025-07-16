import { Schema, Document, model, Types } from 'mongoose';

export interface Todo {
  title: string;
  completed: boolean;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoDoc extends Document, Todo {}

const todoSchema = new Schema<TodoDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const todoModel = model<TodoDoc>('item', todoSchema);
