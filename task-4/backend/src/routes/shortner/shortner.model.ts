import { Model, Schema, model, Error as MongooseError, Types } from 'mongoose';
import { transformError } from '../../common/helpers/transform-error';
import BadRequestError from '../../common/errors/bad-request-error';
import NotFoundError from '../../common/errors/not-found-error';

interface Shortner {
  originalLink: string;
  shortLink: string;
  owner: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShortnerDoc extends Document, Shortner {
  _id: string;
  checkOwner: (userId: string) => boolean;
}
interface ShortnerModel extends Model<ShortnerDoc> {
  createSafe(data: Shortner): Promise<ShortnerDoc>;
  updateSafe(id: string, data: Partial<Shortner>): Promise<ShortnerDoc>;
  deleteSafe(id: string): Promise<ShortnerDoc>;
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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
    // const populatedDoc = await savedDoc.populate('owner');

    return savedDoc;
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);

      throw new BadRequestError(errors[0].message);
    }

    throw error;
  }
};

shortnerSchema.statics.updateSafe = async function (
  id: string,
  data: Partial<Shortner>
): Promise<ShortnerDoc> {
  try {
    const updatedDoc = await this.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!updatedDoc) {
      throw new BadRequestError('Shortner not found');
    }

    return updatedDoc;
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError('Invalid Id');
    }

    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      throw new BadRequestError(errors[0].message);
    }

    if (error instanceof MongooseError.DocumentNotFoundError) {
      throw new NotFoundError();
    }

    throw error;
  }
};

shortnerSchema.statics.deleteSafe = async function (id: string) {
  try {
    console.log(id);
    const deletedDoc = await this.findByIdAndDelete(id).orFail();

    if (!deletedDoc) {
      throw new BadRequestError('Shortner not found');
    }
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      throw new BadRequestError('Invalid ID');
    }

    if (error instanceof MongooseError.DocumentNotFoundError) {
      throw new NotFoundError('Short link not found');
    }
  }
};

shortnerSchema.methods.checkOwner = function (userId: string) {
  return this.owner.toString() === userId;
};

export const shortnerModel = model<ShortnerDoc, ShortnerModel>(
  'shortner',
  shortnerSchema
);
