import { InputType, Field } from "type-graphql";

@InputType()
export class CreateWordEtymologyInput {
  @Field()
  wordId!: number;

  @Field()
  etymologyIds!: number[];
}
