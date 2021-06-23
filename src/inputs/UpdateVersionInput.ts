import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../config/constants';

@InputType()
export default class UpdateVersionInput {
  @Field(NULLABLE)
  version?: string;

  @Field(NULLABLE)
  description?: string;

  @Field(NULLABLE)
  maintenance?: boolean;

  @Field(NULLABLE)
  active?: boolean;
}
