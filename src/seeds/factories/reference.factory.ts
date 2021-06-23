import { define } from 'typeorm-seeding';
import {
  FAKER_ELEMENTS_NUMBER_L,
  FAKER_ELEMENTS_NUMBER_M,
  FAKER_ELEMENTS_NUMBER_S,
  FAKER_ELEMENTS_NUMBER_XXL,
} from '../../config/constants';
import { Reference } from '../../models/Reference';

define(Reference, (faker) => {
  const reference = new Reference();
  reference.author = faker.name.firstName() + faker.name.lastName();
  reference.title = faker.random.words(FAKER_ELEMENTS_NUMBER_M);
  reference.publicationYear = faker.random
    .number(FAKER_ELEMENTS_NUMBER_XXL)
    .toString();
  reference.publicationPlace = faker.random.alphaNumeric(
    FAKER_ELEMENTS_NUMBER_L,
  );
  reference.publishingCompany = faker.random.words(FAKER_ELEMENTS_NUMBER_S);
  reference.active = faker.random.boolean();
  return reference;
});
