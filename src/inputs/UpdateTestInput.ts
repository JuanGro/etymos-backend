import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateTestInput {
  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  questionId?: number;

  @Field({ nullable: true })
  active?: boolean;
}
