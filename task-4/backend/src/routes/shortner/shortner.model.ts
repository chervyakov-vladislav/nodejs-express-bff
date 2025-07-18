import { Model, Schema, model, Error as MongooseError } from 'mongoose';
import { transformError } from '../../common/helpers/transform-error';
import BadRequestError from '../../common/errors/bad-request-error';

interface Shortner {
  originalLink: string;
  shortLink: string;
  // owner: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShortnerDoc extends Document, Shortner {
  _id: string;
}
interface ShortnerModel extends Model<ShortnerDoc> {
  createSafe(data: Shortner): Promise<ShortnerDoc>;
}

const shortnerSchema = new Schema<ShortnerDoc>(
  {
    originalLink: {
      type: String,
      required: [true, 'Original link is required'],
    },
    shortLink: {
      type: String,
      required: [true, 'Short link is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

shortnerSchema.statics.createSafe = async function (
  data: Shortner
): Promise<ShortnerDoc> {
  try {
    const doc = new this(data);
    const savedDoc = await doc.save();

    return savedDoc;
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);

      throw new BadRequestError(errors[0].message);
    }

    throw error;
  }
};

export const shortnerModel = model<ShortnerDoc, ShortnerModel>(
  'shortner',
  shortnerSchema
);
