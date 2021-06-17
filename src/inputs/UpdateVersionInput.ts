import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateVersionInput {
  @Field({ nullable: true })
  version?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  maintenance?: boolean;

  @Field({ nullable: true })
  active?: boolean;
}
