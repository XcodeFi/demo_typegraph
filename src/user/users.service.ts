import { Service } from "typedi";
import { UserModel, User } from "./models/users.model";

@Service({ id: "user.service" })
export class UserService {
  constructor() { }

  async getAll() {
    return UserModel.find();
  }

  async getById(id: string): Promise<User | null> {
    return UserModel.findOne({ _id: id });
  }

  async getByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).lean<User>();
  }

  async insertUser(userInfo: any): Promise<User> {
    const dateNow = new Date();
    const user = UserModel.create({
      ...userInfo,
      createdAt: dateNow
    });
    return user;
  }
}
