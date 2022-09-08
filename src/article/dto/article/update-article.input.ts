import { InputType, Field, ID } from "type-graphql";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateArticleInput {
  @Field(() => ID)
  id: ObjectId;

  @Field()
  title: String;

  @Field()
  text?: String;

  @Field()
  blogUrl: String;
}
