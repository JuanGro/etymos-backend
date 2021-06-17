import { InputType, Field } from "type-graphql";

@InputType()
export class CreateLanguageInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  active!: boolean;
}
