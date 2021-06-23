import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateQuestionInput {
  @Field()
  sentence!: string;

  @Field()
  referenceId!: number;

  @Field()
  active!: boolean;
}
