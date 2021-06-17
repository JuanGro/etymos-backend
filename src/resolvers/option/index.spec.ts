import { Option } from "../../models/Option";
import { dbConnection } from "../../tests/config/databaseConnection";
import { OptionResolver } from ".";

dbConnection();

const { getOptions, getOption, createOption, updateOption, deleteOption } = new OptionResolver();

test("Get all options", () => {
  expect(getOptions()).resolves.toHaveLength(10);
});

test("Get option", async () => {
  const options = await getOptions();
  const firstOption = options[0];
  expect(getOption(firstOption.id)).resolves.toBeInstanceOf(Option);
});

test("Get error if option does not exist", () => {
  expect(getOption(10000)).rejects.toThrowError();
});

test("Create option", async () => {
  expect(getOptions()).resolves.toHaveLength(10);
  const optionCreated = await createOption({
    option: "lorem",
    correct: true,
    active: true
  });
  expect(getOption(optionCreated.id)).resolves.toBeInstanceOf(Option);
  expect(getOptions()).resolves.toHaveLength(11);
});

test("Get error if tries to create an option with incorrect name length", () => {
  expect(createOption({
    option:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
    correct: false,
    active: true
  })).rejects.toThrowError();
});

test("Update option", async () => {
  const optionUpdated = await updateOption(1, {
    option: "lorem ipsum",
    correct: true,
    active: false
  });
  expect(getOption(optionUpdated.id)).resolves.toBeInstanceOf(Option);
  expect(getOption(optionUpdated.id)).resolves.toHaveProperty("active", false);
  expect(getOption(optionUpdated.id)).resolves.toHaveProperty("correct", true);
  expect(getOption(optionUpdated.id)).resolves.toHaveProperty("option", "lorem ipsum");
});

test("Delete option", async () => {
  expect(getOptions()).resolves.toHaveLength(11);
  const options = await getOptions();
  const lastOption: Option = options[options.length - 1];
  expect(deleteOption(lastOption.id)).resolves.toEqual(true);
  expect(getOptions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete an option inexistent", async () => {
  expect(deleteOption(10000)).rejects.toThrowError();
});
