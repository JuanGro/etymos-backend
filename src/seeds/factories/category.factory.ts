import { define } from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../config/constants';
import { Category } from '../../models/Category';

define(Category, (faker) => {
  const category = new Category();
  // Same...
  category.name = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  category.description = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  category.active = faker.random.boolean();
  return category;
});
