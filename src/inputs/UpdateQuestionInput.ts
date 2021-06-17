import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateQuestionInput {
  @Field({ nullable: true })
  sentence?: string;

  @Field({ nullable: true })
  referenceId?: number;

  @Field({ nullable: true })
  active?: boolean;
}
