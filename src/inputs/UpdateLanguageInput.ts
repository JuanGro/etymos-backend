import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateLanguageInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  active?: boolean;
}
