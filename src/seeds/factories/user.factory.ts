import { define } from 'typeorm-seeding';
import { User } from '../../models/User';

define(User, (faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email(firstName, lastName);
  user.active = faker.random.boolean();
  return user;
});
