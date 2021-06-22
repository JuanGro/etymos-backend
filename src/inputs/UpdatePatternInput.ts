import { InputType, Field } from "type-graphql";
import { NULLABLE } from "../config/constants";

@InputType()
export class UpdatePatternInput {
  @Field(NULLABLE)
  pattern?: string;

  @Field(NULLABLE)
  active?: boolean;
}
