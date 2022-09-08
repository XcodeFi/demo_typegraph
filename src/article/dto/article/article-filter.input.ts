import { ObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class ArticleFilterInput {
  slug?: string;

  @Field(() => String)
  id?: ObjectId;
}
