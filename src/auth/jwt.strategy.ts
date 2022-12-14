import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { JwtConfext } from "./JwtContext";

export const isAuth: MiddlewareFn<JwtConfext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "MySecretKey");
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};