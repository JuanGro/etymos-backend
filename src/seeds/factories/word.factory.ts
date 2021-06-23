import { define } from 'typeorm-seeding';
import {
  FAKER_ELEMENTS_NUMBER_L,
  FAKER_ELEMENTS_NUMBER_S,
} from '../../config/constants';
import { Word } from '../../models/Word';

define(Word, (faker) => {
  const word = new Word();
  word.word = faker.random.alphaNumeric(FAKER_ELEMENTS_NUMBER_L);
  word.meaning = faker.random.words(FAKER_ELEMENTS_NUMBER_S);
  word.imageUrl = faker.random.image();
  word.active = faker.random.boolean();
  return word;
});
