import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  active!: boolean;
}
