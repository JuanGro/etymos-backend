import { InputType, Field } from "type-graphql";

@InputType()
export class CreateEtymologyPatternInput {
  @Field()
  etymologyId!: number;

  @Field()
  patternIds!: number[];
}
