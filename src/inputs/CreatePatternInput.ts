import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreatePatternInput {
  @Field()
  pattern!: string;

  @Field()
  active!: boolean;
}
