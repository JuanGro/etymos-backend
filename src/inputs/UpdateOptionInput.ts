import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateOptionInput {
  @Field({ nullable: true })
  option?: string;

  @Field({ nullable: true })
  correct?: boolean;

  @Field({ nullable: true })
  active?: boolean;
}
