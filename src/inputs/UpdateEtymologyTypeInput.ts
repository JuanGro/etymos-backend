import { InputType, Field } from "type-graphql";
import { NULLABLE } from "../config/constants";

@InputType()
export class UpdateEtymologyTypeInput {
  @Field(NULLABLE)
  name?: string;

  @Field(NULLABLE)
  description?: string;

  @Field(NULLABLE)
  active?: boolean;
}
