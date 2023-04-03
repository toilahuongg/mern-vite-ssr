import { TUser } from '@server/schema/user.schema';
import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';
const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const UserModel = model(DOCUMENT_NAME, userSchema);

export default UserModel;
