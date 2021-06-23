import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateTestInput {
  @Field()
  userId!: number;

  @Field()
  questionId!: number;

  @Field()
  active!: boolean;
}
