import { InputType, Field } from "type-graphql";
import { NULLABLE } from "../config/constants";

@InputType()
export class UpdateQuestionInput {
  @Field(NULLABLE)
  sentence?: string;

  @Field(NULLABLE)
  referenceId?: number;

  @Field(NULLABLE)
  active?: boolean;
}
