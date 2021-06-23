import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateOptionInput {
  @Field()
  option!: string;

  @Field()
  correct!: boolean;

  @Field()
  active!: boolean;
}
