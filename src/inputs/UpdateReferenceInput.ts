import { InputType, Field } from "type-graphql";
import { NULLABLE } from "../config/constants";

@InputType()
export class UpdateReferenceInput {
  @Field(NULLABLE)
  author?: string;

  @Field(NULLABLE)
  title?: string;

  @Field(NULLABLE)
  publicationYear?: string;

  @Field(NULLABLE)
  publicationPlace?: string;

  @Field(NULLABLE)
  publishingCompany?: string;

  @Field(NULLABLE)
  active?: boolean;
}
