import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateWordInput {
  @Field()
  word!: string;

  @Field()
  meaning!: string;

  @Field()
  imageUrl!: string;

  @Field()
  categoryId!: number;

  @Field()
  active!: boolean;
}
