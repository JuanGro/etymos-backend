import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserWordInput {
  @Field()
  userId!: number;

  @Field()
  wordIds!: number[];
}
