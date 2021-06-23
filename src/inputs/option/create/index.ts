import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateOptionInput {
  @Field()
  option!: string;

  @Field()
  correct!: boolean;

  @Field()
  active!: boolean;
}
