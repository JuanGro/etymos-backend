import { Option } from "../../models/Option";
import { OptionResolver } from ".";
import { FAKER_ELEMENTS, FIRST_INDEX, INEXISTENT_INDEX, DUMMY_TEXT_XS, ERROR_MAX_LENGTH, ERROR_DUPLICATE_KEY, DUMMY_TEXT2_XS, OPTION_NOT_FOUND, DUMMY_TEXT_XL } from "../../config/constants";

const { getOptions, getOption, createOption, updateOption, deleteOption } =
  new OptionResolver();

test("Get all options", async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS);
});

test("Get option", async () => {
  const options = await getOptions();
  const { id } = options[FIRST_INDEX];
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
});

test("Get error if option does not exist", async () => {
  await expect(getOption(INEXISTENT_INDEX)).rejects.toThrowError(OPTION_NOT_FOUND);
});

test("Create option", async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS);
  const { id } = await createOption({
    option: DUMMY_TEXT_XS,
    correct: true,
    active: true,
  });
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS + 1);
});

test("Get error if tries to create an option with incorrect option length", async () => {
  await expect(
    createOption({
      option:
        DUMMY_TEXT_XL,
      correct: false,
      active: true,
    })
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test("Get error if tries to create an option with duplicate option", async () => {
  await expect(
    createOption({
      option: DUMMY_TEXT_XS,
      correct: false,
      active: true,
    })
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test("Update option", async () => {
  const { id } = await updateOption(1, {
    option: DUMMY_TEXT2_XS,
    correct: true,
    active: false,
  });
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
  await expect(getOption(id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getOption(id)).resolves.toHaveProperty(
    "correct",
    true
  );
  await expect(getOption(id)).resolves.toHaveProperty(
    "option",
    DUMMY_TEXT2_XS
  );
});

test("Delete option", async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS + 1);
  const options = await getOptions();
  const { id } = options[options.length - 1];
  await expect(deleteOption(id)).resolves.toEqual(true);
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS);
});

test("Get error if tries to delete an option inexistent", async () => {
  await expect(deleteOption(INEXISTENT_INDEX)).rejects.toThrowError(OPTION_NOT_FOUND);
});
