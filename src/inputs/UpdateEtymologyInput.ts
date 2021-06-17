import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateEtymologyInput {
  @Field({ nullable: true })
  graecoLatinEtymology?: string;

  @Field({ nullable: true })
  meaning?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  etymologyTypeId?: number;

  @Field({ nullable: true })
  languageId?: number;

  @Field({ nullable: true })
  active?: boolean;
}
