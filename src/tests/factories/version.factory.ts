import { define } from "typeorm-seeding";
import { Version } from "../../models/Version";

define(Version, (faker: Faker.FakerStatic) => {
  const version = new Version();
  version.version = `${faker.random.number(9)}.${faker.random.number(
    9
  )}.${faker.random.number(9)}`;
  version.description = faker.random.words(7);
  version.maintenance = faker.random.boolean();
  version.active = faker.random.boolean();
  return version;
});
