import { define } from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../config/constants';
import { Pattern } from '../../models/Pattern';

define(Pattern, (faker: Faker.FakerStatic) => {
  const pattern = new Pattern();
  pattern.pattern = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  pattern.active = faker.random.boolean();
  return pattern;
});
