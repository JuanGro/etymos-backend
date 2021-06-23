import { define } from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../constants';
import { Option } from '../../../models/option';

define(Option, (faker) => {
  const option = new Option();
  option.option = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  option.correct = faker.random.boolean();
  option.active = faker.random.boolean();
  return option;
});
