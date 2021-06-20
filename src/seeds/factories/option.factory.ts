import { define } from "typeorm-seeding";
import { Option } from "../../models/Option";

define(Option, (faker: Faker.FakerStatic) => {
  const option = new Option();
  option.option = faker.random.alphaNumeric(10);
  option.correct = faker.random.boolean();
  option.active = faker.random.boolean();
  return option;
});
