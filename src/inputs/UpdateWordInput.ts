import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateWordInput {
  @Field({ nullable: true })
  word?: string;

  @Field({ nullable: true })
  meaning?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  categoryId?: number;

  @Field({ nullable: true })
  active?: boolean;
}
