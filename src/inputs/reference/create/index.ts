import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateReferenceInput {
  @Field()
  author!: string;

  @Field()
  title!: string;

  @Field()
  publicationYear!: string;

  @Field()
  publicationPlace!: string;

  @Field()
  publishingCompany!: string;

  @Field()
  active!: boolean;
}
