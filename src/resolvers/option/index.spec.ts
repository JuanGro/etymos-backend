import { Option } from "../../models/Option";
import { OptionResolver } from ".";

const { getOptions, getOption, createOption, updateOption, deleteOption } =
  new OptionResolver();

test("Get all options", async () => {
  await expect(getOptions()).resolves.toHaveLength(10);
});

test("Get option", async () => {
  const options = await getOptions();
  const firstOption = options[0];
  await expect(getOption(firstOption.id)).resolves.toBeInstanceOf(Option);
});

test("Get error if option does not exist", async () => {
  await expect(getOption(10000)).rejects.toThrowError("Option not found!");
});

test("Create option", async () => {
  await expect(getOptions()).resolves.toHaveLength(10);
  const optionCreated = await createOption({
    option: "lorem",
    correct: true,
    active: true,
  });
  await expect(getOption(optionCreated.id)).resolves.toBeInstanceOf(Option);
  await expect(getOptions()).resolves.toHaveLength(11);
});

test("Get error if tries to create an option with incorrect option length", async () => {
  await expect(
    createOption({
      option:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      correct: false,
      active: true,
    })
  ).rejects.toThrowError("value too long for type character varying(64)");
});

test("Get error if tries to create an option with duplicate option", async () => {
  await expect(
    createOption({
      option:"lorem",
      correct: false,
      active: true,
    })
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update option", async () => {
  const optionUpdated = await updateOption(1, {
    option: "lorem ipsum",
    correct: true,
    active: false,
  });
  await expect(getOption(optionUpdated.id)).resolves.toBeInstanceOf(Option);
  await expect(getOption(optionUpdated.id)).resolves.toHaveProperty("active", false);
  await expect(getOption(optionUpdated.id)).resolves.toHaveProperty("correct", true);
  await expect(getOption(optionUpdated.id)).resolves.toHaveProperty(
    "option",
    "lorem ipsum"
  );
});

test("Delete option", async () => {
  await expect(getOptions()).resolves.toHaveLength(11);
  const options = await getOptions();
  const lastOption: Option = options[options.length - 1];
  await expect(deleteOption(lastOption.id)).resolves.toEqual(true);
  await expect(getOptions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete an option inexistent", async () => {
  await expect(deleteOption(10000)).rejects.toThrowError("Option not found!");
});
