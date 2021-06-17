import { define } from "typeorm-seeding";
import { Etymology } from "../../models/Etymology";

define(Etymology, (faker: Faker.FakerStatic) => {
  const etymology = new Etymology();
  etymology.graecoLatinEtymology = faker.random.alphaNumeric(10);
  etymology.meaning = faker.random.alphaNumeric(10);
  etymology.imageUrl = faker.random.image();
  etymology.active = faker.random.boolean();
  return etymology;
});
