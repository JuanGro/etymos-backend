import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateReferenceInput {
  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  publicationYear?: string;

  @Field({ nullable: true })
  publicationPlace?: string;

  @Field({ nullable: true })
  publishingCompany?: string;

  @Field({ nullable: true })
  active?: boolean;
}
