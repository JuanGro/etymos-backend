import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../config/constants';

@InputType()
export default class UpdateLanguageInput {
  @Field(NULLABLE)
  name?: string;

  @Field(NULLABLE)
  description?: string;

  @Field(NULLABLE)
  active?: boolean;
}
