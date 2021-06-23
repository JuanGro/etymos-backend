import { define } from "typeorm-seeding";
import { FAKER_ELEMENTS_NUMBER_M } from "../../config/constants";
import { Question } from "../../models/Question";

define(Question, (faker: Faker.FakerStatic) => {
  const question = new Question();
  question.sentence = faker.random.words(FAKER_ELEMENTS_NUMBER_M);
  question.active = faker.random.boolean();
  return question;
});
