import { User } from "../../models/User";
import { dbConnection } from "../../tests/config/databaseConnection";
import { UserResolver } from ".";

dbConnection();

const userResolver = new UserResolver();

test("Get all users", () => {
  expect(userResolver.getUsers()).resolves.toHaveLength(10);
});

test("Get user", async () => {
  const users = await userResolver.getUsers();
  const firstUser = users[0];
  expect(userResolver.getUser(firstUser.id)).resolves.toBeInstanceOf(User);
});

test("Get error if user does not exist", () => {
  expect(userResolver.getUser(10000)).rejects.toThrowError();
});

test("Create user", async () => {
  expect(userResolver.getUsers()).resolves.toHaveLength(10);
  const userCreated = await userResolver.createUser({
    name: "Javier Fernando González Montalvo",
    email: "test@mail.com",
    active: true
  });
  expect(userResolver.getUser(userCreated.id)).resolves.toBeInstanceOf(User);
  expect(userResolver.getUsers()).resolves.toHaveLength(11);
});

test("Get error if tries to create a user with incorrect name length", () => {
  expect(userResolver.createUser({
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      email: "test@mail.com",
      active: true
    })).rejects.toThrowError();
});

test("Update user", async () => {
  const userUpdated = await userResolver.updateUser(1, {
    name: "Javier Fernando González Montalvo",
    email: "lorem@mail.com",
    active: false
  });
  expect(userResolver.getUser(userUpdated.id)).resolves.toBeInstanceOf(User);
  expect(userResolver.getUser(userUpdated.id)).resolves.toHaveProperty("active", false);
  expect(userResolver.getUser(userUpdated.id)).resolves.toHaveProperty("name", "Javier Fernando González Montalvo");
  expect(userResolver.getUser(userUpdated.id)).resolves.toHaveProperty("email", "lorem@mail.com");
});

test("Delete user", async () => {
  expect(userResolver.getUsers()).resolves.toHaveLength(11);
  const users = await userResolver.getUsers();
  const lastUser = users[users.length - 1];
  expect(userResolver.deleteUser(lastUser.id)).resolves.toEqual(true);
  expect(userResolver.getUsers()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a user inexistent", () => {
  expect(userResolver.deleteUser(10000)).rejects.toThrowError();
});
