import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../../../config/constants';

@InputType()
export class UpdateOptionInput {
  @Field(NULLABLE)
  option?: string;

  @Field(NULLABLE)
  correct?: boolean;

  @Field(NULLABLE)
  active?: boolean;
}
