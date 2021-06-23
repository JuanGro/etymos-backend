import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateUserWordInput {
  @Field()
  userId!: number;

  @Field()
  wordIds!: number[];
}
