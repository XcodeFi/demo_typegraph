import { ClassType, Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class PaginationInfo {
  @Field(()=> Int)
  totalCount: number;
  @Field()
  hasPreviousPage: boolean;
  @Field()
  hasNextPage: boolean;
  @Field(()=> Int)
  page: number|undefined;
  @Field(()=> Int)
  totalPages: number;
  @Field(()=> Int)
  nextPage: number|null|undefined;
  @Field(()=> Int)
  prevPage: number|null|undefined;
}

export class Pagination<T> extends PaginationInfo {
  results: T[]|any;
}

// ugly hack to make generic works
export const Paginated = <T>(classRef: ClassType<T>): any => {
  @ObjectType()
  abstract class PaginationType extends PaginationInfo {
    @Field(() => [classRef])
    results: T[];
  }

  return PaginationType;
};
