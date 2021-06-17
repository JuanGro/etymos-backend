import { User } from "../../models/User";
import { dbConnection } from "../../tests/config/databaseConnection";
import { UserResolver } from ".";

dbConnection();

const userResolver = new UserResolver();

test("Get all users", async () => {
  expect((await userResolver.getUsers()).length).toEqual(10);
});

test("Get user", async () => {
  const users = await userResolver.getUsers();
  const firstUser = users[0];
  expect(await userResolver.getUser(firstUser.id)).toBeInstanceOf(User);
});

test("Get error if user does not exist", async () => {
  expect(async () => {
    await userResolver.getUser(10000);
  }).rejects.toThrowError();
});

test("Create user", async () => {
  expect((await userResolver.getUsers()).length).toEqual(10);
  const userCreated = await userResolver.createUser({
    name: "Javier Fernando González Montalvo",
    email: "test@mail.com",
    active: true
  });
  expect(await userResolver.getUser(userCreated.id)).toBeInstanceOf(User);
  expect((await userResolver.getUsers()).length).toEqual(11);
});

test("Get error if tries to create a user with incorrect name length", async () => {
  expect(async () => {
    await userResolver.createUser({
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      email: "test@mail.com",
      active: true
    });
  }).rejects.toThrowError();
});

test("Update user", async () => {
  const userUpdated = await userResolver.updateUser(1, {
    name: "Javier Fernando González Montalvo",
    email: "lorem@mail.com",
    active: false
  });
  expect(await userResolver.getUser(userUpdated.id)).toBeInstanceOf(User);
  expect((await userResolver.getUser(userUpdated.id)).active).toBeFalsy();
  expect((await userResolver.getUser(userUpdated.id)).email).toBe("lorem@mail.com");
});

test("Delete user", async () => {
  expect((await userResolver.getUsers()).length).toEqual(11);
  const users = await userResolver.getUsers();
  const lastUser = users[users.length - 1];
  const userDeleted = await userResolver.deleteUser(lastUser.id);
  expect(userDeleted).toEqual(true);
  expect((await userResolver.getUsers()).length).toEqual(10);
});

test("Get error if tries to delete a user inexistent", async () => {
  expect(async () => {
    await userResolver.deleteUser(10000);
  }).rejects.toThrowError();
});
