import { define } from "typeorm-seeding";
import { Question } from "../../models/Question";

define(Question, (faker: Faker.FakerStatic) => {
  const question = new Question();
  question.sentence = faker.random.words(7);
  question.active = faker.random.boolean();
  return question;
});
