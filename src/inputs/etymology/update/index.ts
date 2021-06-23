import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../../../config/constants';

@InputType()
export class UpdateEtymologyInput {
  @Field(NULLABLE)
  graecoLatinEtymology?: string;

  @Field(NULLABLE)
  meaning?: string;

  @Field(NULLABLE)
  imageUrl?: string;

  @Field(NULLABLE)
  etymologyTypeId?: number;

  @Field(NULLABLE)
  languageId?: number;

  @Field(NULLABLE)
  active?: boolean;
}
