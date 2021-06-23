import { define } from 'typeorm-seeding';
import { FAKER_ELEMENTS_NUMBER_L } from '../../../config/constants';
import { Etymology } from '../../../models/etymology';

define(Etymology, (faker) => {
  const etymology = new Etymology();
  etymology.graecoLatinEtymology = faker.random.alphaNumeric(
    FAKER_ELEMENTS_NUMBER_L,
  );
  etymology.meaning = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  etymology.imageUrl = faker.random.image();
  etymology.active = faker.random.boolean();
  return etymology;
});
