import { User } from "../../models/User";
import { UserResolver } from ".";

const { getUsers, getUser, createUser, updateUser, deleteUser } =
  new UserResolver();

test("Get all users", async () => {
  await expect(getUsers()).resolves.toHaveLength(10);
});

test("Get user", async () => {
  const users = await getUsers();
  const firstUser = users[0];
  await expect(getUser(firstUser.id)).resolves.toBeInstanceOf(User);
});

test("Get error if user does not exist", async () => {
  await expect(getUser(10000)).rejects.toThrowError();
});

test("Create user", async () => {
  await expect(getUsers()).resolves.toHaveLength(10);
  const userCreated = await createUser({
    name: "Javier Fernando González Montalvo",
    email: "test@mail.com",
    active: true,
  });
  await expect(getUser(userCreated.id)).resolves.toBeInstanceOf(User);
  await expect(getUsers()).resolves.toHaveLength(11);
});

test("Get error if tries to create a user with incorrect name length", async () => {
  await expect(
    createUser({
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      email: "test@mail.com",
      active: true,
    })
  ).rejects.toThrowError();
});

test("Update user", async () => {
  const userUpdated = await updateUser(1, {
    name: "Javier Fernando González Montalvo",
    email: "lorem@mail.com",
    active: false,
  });
  await expect(getUser(userUpdated.id)).resolves.toBeInstanceOf(User);
  await expect(getUser(userUpdated.id)).resolves.toHaveProperty("active", false);
  await expect(getUser(userUpdated.id)).resolves.toHaveProperty(
    "name",
    "Javier Fernando González Montalvo"
  );
  await expect(getUser(userUpdated.id)).resolves.toHaveProperty(
    "email",
    "lorem@mail.com"
  );
});

test("Delete user", async () => {
  await expect(getUsers()).resolves.toHaveLength(11);
  const users = await getUsers();
  const lastUser = users[users.length - 1];
  await expect(deleteUser(lastUser.id)).resolves.toEqual(true);
  await expect(getUsers()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a user inexistent", async () => {
  await expect(deleteUser(10000)).rejects.toThrowError();
});
