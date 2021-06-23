import { InputType, Field } from 'type-graphql';
import { NULLABLE } from '../config/constants';

@InputType()
export class UpdateWordInput {
  @Field(NULLABLE)
  word?: string;

  @Field(NULLABLE)
  meaning?: string;

  @Field(NULLABLE)
  imageUrl?: string;

  @Field(NULLABLE)
  categoryId?: number;

  @Field(NULLABLE)
  active?: boolean;
}
