import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePatternInput {
  @Field({ nullable: true })
  pattern?: string;

  @Field({ nullable: true })
  active?: boolean;
}
