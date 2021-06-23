import { define } from 'typeorm-seeding';
import {
  FAKER_ELEMENTS_NUMBER_M,
  FAKER_ELEMENTS_NUMBER_XL,
} from '../../constants';
import { Version } from '../../../models/version';

define(Version, (faker) => {
  const version = new Version();
  version.version = `${faker.random.number(
    FAKER_ELEMENTS_NUMBER_XL,
  )}.${faker.random.number(FAKER_ELEMENTS_NUMBER_XL)}.${faker.random.number(
    FAKER_ELEMENTS_NUMBER_XL,
  )}`;
  version.description = faker.random.words(FAKER_ELEMENTS_NUMBER_M);
  version.maintenance = faker.random.boolean();
  version.active = faker.random.boolean();
  return version;
});
