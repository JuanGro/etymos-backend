import { User } from '../../models/User';
import { UserResolver } from '.';
import {
  DUMMY_EMAIL,
  DUMMY_EMAIL2,
  DUMMY_TEXT_S,
  DUMMY_TEXT_XL,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  USER_NOT_FOUND,
} from '../../config/constants';

const {
  getUsers, getUser, createUser, updateUser, deleteUser,
} = new UserResolver();

test('Get all users', async () => {
  await expect(getUsers()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get user', async () => {
  const [users] = await getUsers();
  const { id } = users;
  await expect(getUser(id)).resolves.toBeInstanceOf(User);
});

test('Get error if user does not exist', async () => {
  await expect(getUser(INEXISTENT_INDEX)).rejects.toThrowError(USER_NOT_FOUND);
});

test('Create user', async () => {
  await expect(getUsers()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createUser({
    name: DUMMY_TEXT_S,
    email: DUMMY_EMAIL,
    active: true,
  });
  await expect(getUser(id)).resolves.toBeInstanceOf(User);
  await expect(getUsers()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Get error if tries to create a user with incorrect name length', async () => {
  await expect(
    createUser({
      name: DUMMY_TEXT_XL,
      email: DUMMY_EMAIL,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a user with duplicate email', async () => {
  await expect(
    createUser({
      name: DUMMY_TEXT_S,
      email: DUMMY_EMAIL,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update user', async () => {
  const { id } = await updateUser(1, {
    name: DUMMY_TEXT_S,
    email: DUMMY_EMAIL2,
    active: false,
  });
  await expect(getUser(id)).resolves.toBeInstanceOf(User);
  await expect(getUser(id)).resolves.toHaveProperty('active', false);
  await expect(getUser(id)).resolves.toHaveProperty('name', DUMMY_TEXT_S);
  await expect(getUser(id)).resolves.toHaveProperty('email', DUMMY_EMAIL2);
});

test('Delete user', async () => {
  await expect(getUsers()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const users = await getUsers();
  const { id } = users[users.length - 1];
  await expect(deleteUser(id)).resolves.toEqual(true);
  await expect(getUsers()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a user inexistent', async () => {
  await expect(deleteUser(INEXISTENT_INDEX)).rejects.toThrowError(
    USER_NOT_FOUND,
  );
});
