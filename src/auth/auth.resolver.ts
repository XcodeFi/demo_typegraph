import { JWTTokenResponseType, LoginInputType } from "../user/dto/login.dto";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { AuthService } from "./auth.service";

@Resolver(() => JWTTokenResponseType)
@Service()
export class AuthResolver {
  constructor(
      @Inject("auth.service")
      private readonly authService: AuthService) {}

  @Mutation(() => JWTTokenResponseType, {
    description: "login using email/password to obtain a JWT token",
  })
  async login(
    @Arg("input") user: LoginInputType,
  ): Promise<JWTTokenResponseType> {
    return this.authService.loginUser(user.email, user.password);
  }

//   @Query(() => User, { description: "returns current logged in user" })
//   async currentUser(@CurrentUser() currentUser: User): Promise<User> {
//     return currentUser;
//   }
}
