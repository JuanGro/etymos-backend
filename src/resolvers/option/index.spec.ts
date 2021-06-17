import { Option } from "../../models/Option";
import { dbConnection } from "../../tests/config/databaseConnection";
import { OptionResolver } from ".";

dbConnection();

const optionResolver = new OptionResolver();

test("Get all options", () => {
  expect(optionResolver.getOptions()).resolves.toHaveLength(10);
});

test("Get option", async () => {
  const options = await optionResolver.getOptions();
  const firstOption = options[0];
  expect(optionResolver.getOption(firstOption.id)).resolves.toBeInstanceOf(Option);
});

test("Get error if option does not exist", () => {
  expect(optionResolver.getOption(10000)).rejects.toThrowError();
});

test("Create option", async () => {
  expect(optionResolver.getOptions()).resolves.toHaveLength(10);
  const optionCreated = await optionResolver.createOption({
    option: "lorem",
    correct: true,
    active: true
  });
  expect(optionResolver.getOption(optionCreated.id)).resolves.toBeInstanceOf(Option);
  expect(optionResolver.getOptions()).resolves.toHaveLength(11);
});

test("Get error if tries to create an option with incorrect name length", () => {
  expect(optionResolver.createOption({
    option:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
    correct: false,
    active: true
  })).rejects.toThrowError();
});

test("Update option", async () => {
  const optionUpdated = await optionResolver.updateOption(1, {
    option: "lorem ipsum",
    correct: true,
    active: false
  });
  expect(optionResolver.getOption(optionUpdated.id)).resolves.toBeInstanceOf(Option);
  expect(optionResolver.getOption(optionUpdated.id)).resolves.toHaveProperty("active", false);
  expect(optionResolver.getOption(optionUpdated.id)).resolves.toHaveProperty("correct", true);
  expect(optionResolver.getOption(optionUpdated.id)).resolves.toHaveProperty("option", "lorem ipsum");
});

test("Delete option", async () => {
  expect(optionResolver.getOptions()).resolves.toHaveLength(11);
  const options = await optionResolver.getOptions();
  const lastOption: Option = options[options.length - 1];
  expect(optionResolver.deleteOption(lastOption.id)).resolves.toEqual(true);
  expect(optionResolver.getOptions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete an option inexistent", async () => {
  expect(optionResolver.deleteOption(10000)).rejects.toThrowError();
});
