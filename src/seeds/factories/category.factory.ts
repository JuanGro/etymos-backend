import { define } from "typeorm-seeding";
import { Category } from "../../models/Category";

define(Category, (faker: Faker.FakerStatic) => {
  const category = new Category();
  // Same...
  category.name = faker.random.alphaNumeric(10);
  category.description = faker.random.alphaNumeric(10);
  category.active = faker.random.boolean();
  return category;
});
