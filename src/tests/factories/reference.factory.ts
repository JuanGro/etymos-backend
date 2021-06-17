import { define } from "typeorm-seeding";
import { Reference } from "../../models/Reference";

define(Reference, (faker: Faker.FakerStatic) => {
  const reference = new Reference();
  reference.author = faker.name.firstName() + faker.name.lastName();
  reference.title = faker.random.words(5);
  reference.publicationYear = faker.random.number(9999).toString();
  reference.publicationPlace = faker.random.alphaNumeric(10);
  reference.publishingCompany = faker.random.words(3);
  reference.active = faker.random.boolean();
  return reference;
});
