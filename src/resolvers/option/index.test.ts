import { Option } from '../../models/option';
import { OptionResolver } from '.';
import {
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  ERROR_MAX_LENGTH,
  ERROR_DUPLICATE_KEY,
  DUMMY_TEXT2_XS,
  OPTION_NOT_FOUND,
  DUMMY_OPTION,
  DUMMY_OPTION2,
  DUMMY_OPTION_INCORRECT,
} from '../../config/constants';

const {
  getOptions, getOption, createOption, updateOption, deleteOption,
} = new OptionResolver();

test('Get all options', async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get option', async () => {
  const [options] = await getOptions();
  const { id } = options;
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
});

test('Get error if option does not exist', async () => {
  await expect(getOption(INEXISTENT_INDEX)).rejects.toThrowError(
    OPTION_NOT_FOUND,
  );
});

test('Create option', async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createOption(DUMMY_OPTION);
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Get error if tries to create an option with incorrect option length', async () => {
  await expect(
    createOption(DUMMY_OPTION_INCORRECT),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create an option with duplicate option', async () => {
  await expect(
    createOption(DUMMY_OPTION),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update option', async () => {
  const { id } = await updateOption(1, DUMMY_OPTION2);
  await expect(getOption(id)).resolves.toBeInstanceOf(Option);
  await expect(getOption(id)).resolves.toHaveProperty('active', true);
  await expect(getOption(id)).resolves.toHaveProperty('correct', true);
  await expect(getOption(id)).resolves.toHaveProperty('option', DUMMY_TEXT2_XS);
});

test('Delete option', async () => {
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const options = await getOptions();
  const { id } = options[options.length - 1];
  await expect(deleteOption(id)).resolves.toBeInstanceOf(Option);
  await expect(getOptions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete an option inexistent', async () => {
  await expect(deleteOption(INEXISTENT_INDEX)).rejects.toThrowError(
    OPTION_NOT_FOUND,
  );
});
