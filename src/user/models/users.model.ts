import { model, Schema, ObjectId } from 'mongoose';
// import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export interface User {
  _id: ObjectId;

  id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicUrl?: string;
  // roles: Role[];
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
      // select: false,
    },
    password: {
      type: Schema.Types.String,
      // select: false,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    // roles: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Role',
    //     },
    //   ],
    //   required: true,
    //   select: false,
    // },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      // select: false,
    },
    updatedAt: {
      type: Date,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
