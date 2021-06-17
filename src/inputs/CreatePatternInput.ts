import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePatternInput {
  @Field()
  pattern!: string;

  @Field()
  active!: boolean;
}
