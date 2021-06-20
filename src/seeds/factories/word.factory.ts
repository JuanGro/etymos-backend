import { define } from "typeorm-seeding";
import { Word } from "../../models/Word";

define(Word, (faker: Faker.FakerStatic) => {
  const word = new Word();
  word.word = faker.random.alphaNumeric(10);
  word.meaning = faker.random.words(4);
  word.imageUrl = faker.random.image();
  word.active = faker.random.boolean();
  return word;
});
