import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateEtymologyInput {
  @Field()
  graecoLatinEtymology!: string;

  @Field()
  meaning!: string;

  @Field()
  imageUrl!: string;

  @Field()
  etymologyTypeId!: number;

  @Field()
  languageId!: number;

  @Field()
  active!: boolean;
}
