import { TAccount } from '@server/schema/account.schema';
import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = 'Accounts';
const accountSchema = new Schema<TAccount>(
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
const AccountModel = model(DOCUMENT_NAME, accountSchema);

export default AccountModel;
