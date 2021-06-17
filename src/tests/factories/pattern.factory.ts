import { define } from "typeorm-seeding";
import { Pattern } from "../../models/Pattern";

define(Pattern, (faker: Faker.FakerStatic) => {
  const pattern = new Pattern();
  pattern.pattern = faker.random.alphaNumeric(10);
  pattern.active = faker.random.boolean();
  return pattern;
});
