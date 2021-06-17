import { InputType, Field } from "type-graphql";

@InputType()
export class CreateVersionInput {
  @Field()
  version!: string;

  @Field()
  description!: string;

  @Field()
  maintenance!: boolean;

  @Field()
  active!: boolean;
}
