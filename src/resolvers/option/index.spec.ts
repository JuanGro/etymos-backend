import { Option } from "../../models/Option";
import { dbConnection } from "../../tests/config/databaseConnection";
import { OptionResolver } from ".";

dbConnection();

const optionResolver = new OptionResolver();

test("Get all options", async () => {
  expect((await optionResolver.getOptions()).length).toEqual(10);
});

test("Get option", async () => {
  const options = await optionResolver.getOptions();
  const firstOption = options[0];
  expect(await optionResolver.getOption(firstOption.id)).toBeInstanceOf(Option);
});

test("Get error if option does not exist", async () => {
  expect(async () => {
    await optionResolver.getOption(10000);
  }).rejects.toThrowError();
});

test("Create option", async () => {
  expect((await optionResolver.getOptions()).length).toEqual(10);
  const optionCreated = await optionResolver.createOption({
    option: "lorem",
    correct: true,
    active: true
  });
  expect(await optionResolver.getOption(optionCreated.id)).toBeInstanceOf(
    Option
  );
  expect((await optionResolver.getOptions()).length).toEqual(11);
});

test("Get error if tries to create an option with incorrect name length", async () => {
  expect(async () => {
    await optionResolver.createOption({
      option:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      correct: false,
      active: true
    });
  }).rejects.toThrowError();
});

test("Update option", async () => {
  const optionUpdated = await optionResolver.updateOption(1, {
    option: "lorem ipsum",
    correct: true,
    active: false
  });
  expect(await optionResolver.getOption(optionUpdated.id)).toBeInstanceOf(
    Option
  );
  expect((await optionResolver.getOption(optionUpdated.id)).active).toBeFalsy();
  expect((await optionResolver.getOption(optionUpdated.id)).option).toBe("lorem ipsum");
});

test("Delete option", async () => {
  expect((await optionResolver.getOptions()).length).toEqual(11);
  const options = await optionResolver.getOptions();
  const lastOption: Option = options[options.length - 1];
  const optionDeleted = await optionResolver.deleteOption(lastOption.id);
  expect(optionDeleted).toEqual(true);
  expect((await optionResolver.getOptions()).length).toEqual(10);
});

test("Get error if tries to delete an option inexistent", async () => {
  expect(async () => {
    await optionResolver.deleteOption(10000);
  }).rejects.toThrowError();
});
