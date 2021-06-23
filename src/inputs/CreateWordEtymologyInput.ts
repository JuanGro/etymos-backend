import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateWordEtymologyInput {
  @Field()
  wordId!: number;

  @Field()
  etymologyIds!: number[];
}
