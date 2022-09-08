import { User } from './../models/users.model';
import UserSchema from '../../user/schemas/user.schema';
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LoginInputType {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class JWTTokenResponseType {
  @Field(() => String)
  token?: string;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => UserSchema)
  user?: User
}
