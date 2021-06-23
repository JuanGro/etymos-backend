import { define } from 'typeorm-seeding';
import { Test } from '../../models/Test';

define(Test, (faker: Faker.FakerStatic) => {
  const test = new Test();
  test.correct = faker.random.boolean();
  test.active = faker.random.boolean();
  return test;
});
