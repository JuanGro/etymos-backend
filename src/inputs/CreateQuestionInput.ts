import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateQuestionInput {
  @Field()
  sentence!: string;

  @Field()
  referenceId!: number;

  @Field()
  active!: boolean;
}
