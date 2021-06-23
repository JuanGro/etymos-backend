import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTestInput {
  @Field()
  userId!: number;

  @Field()
  questionId!: number;

  @Field()
  active!: boolean;
}
