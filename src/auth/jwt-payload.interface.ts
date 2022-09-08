import { ObjectId } from "mongoose";

export interface JWTPayload {
  id: ObjectId;
  username: string;
  email: string;
}
