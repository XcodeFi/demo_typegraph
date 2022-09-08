// import { ObjectId } from 'mongodb';
import { JwtConfext } from "~/auth/JwtContext";
import { createParamDecorator } from "type-graphql";
import { User } from "~/user/models/users.model";

export default function CurrentUser() {
  return createParamDecorator<JwtConfext>(({ context }) => {

    const user = {
      id: context.payload?.id,
      username: context.payload?.username,
      email: context.payload?.email
    } as User;

    return user;
  });
}