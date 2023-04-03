import { TKey } from '@server/schema/key.schema';
import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
const userSchema = new Schema<TKey>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: { type: [String], required: true, default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const KeyModel = model<TKey>(DOCUMENT_NAME, userSchema);

export default KeyModel;
