import { define } from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../constants';
import { Pattern } from '../../../models/pattern';

define(Pattern, (faker) => {
  const pattern = new Pattern();
  pattern.pattern = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  pattern.active = faker.random.boolean();
  return pattern;
});
