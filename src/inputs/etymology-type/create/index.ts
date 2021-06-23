import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateEtymologyTypeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  active!: boolean;
}
