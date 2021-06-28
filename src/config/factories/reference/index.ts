import { define } from 'typeorm-seeding';
import {
  FAKER_ELEMENTS_NUMBER_L,
  FAKER_ELEMENTS_NUMBER_M,
  FAKER_ELEMENTS_NUMBER_S,
  FAKER_ELEMENTS_NUMBER_XXL,
} from '../../constants';
import { Reference } from '../../../models/reference';

define(Reference, (faker) => {
  const reference = new Reference();
  // as a good practice to concatenate string use string templates instead of +
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
