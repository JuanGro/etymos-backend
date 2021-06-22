import { InputType, Field } from "type-graphql";
import { NULLABLE } from "../config/constants";

@InputType()
export class UpdateTestInput {
  @Field(NULLABLE)
  userId?: number;

  @Field(NULLABLE)
  questionId?: number;

  @Field(NULLABLE)
  active?: boolean;
}
