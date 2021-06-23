import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateEtymologyPatternInput {
  @Field()
  etymologyId!: number;

  @Field()
  patternIds!: number[];
}
