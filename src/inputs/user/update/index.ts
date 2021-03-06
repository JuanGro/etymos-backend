import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../../../config/constants';

@InputType()
export class UpdateUserInput {
  @Field(NULLABLE)
  name?: string;

  @Field(NULLABLE)
  email?: string;

  @Field(NULLABLE)
  active?: boolean;
}
