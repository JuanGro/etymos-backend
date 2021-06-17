import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  active!: boolean;
}
