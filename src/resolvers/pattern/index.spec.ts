import { Pattern } from '../../models/Pattern';
import { PatternResolver } from '.';
import {
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  DUMMY_TEXT_XS,
  DUMMY_TEXT_XL,
  PATTERN_NOT_FOUND,
  DUMMY_TEXT2_XS,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
} from '../../config/constants';

const {
  getPatterns, getPattern, createPattern, updatePattern, deletePattern,
} = new PatternResolver();

test('Get all patterns', async () => {
  await expect(getPatterns()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get pattern', async () => {
  const [patterns] = await getPatterns();
  const { id } = patterns;
  await expect(getPattern(id)).resolves.toBeInstanceOf(Pattern);
});

test('Get error if pattern does not exist', async () => {
  await expect(getPattern(INEXISTENT_INDEX)).rejects.toThrowError(
    PATTERN_NOT_FOUND,
  );
});

test('Create pattern', async () => {
  await expect(getPatterns()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createPattern({
    pattern: DUMMY_TEXT_XS,
    active: true,
  });
  await expect(getPattern(id)).resolves.toBeInstanceOf(Pattern);
  await expect(getPatterns()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
});

test('Get error if tries to create a pattern with incorrect pattern length', async () => {
  await expect(
    createPattern({
      pattern: DUMMY_TEXT_XL,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a pattern with duplicate pattern', async () => {
  await expect(
    createPattern({
      pattern: DUMMY_TEXT_XS,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update pattern', async () => {
  const { id } = await updatePattern(1, {
    pattern: DUMMY_TEXT2_XS,
    active: false,
  });
  await expect(getPattern(id)).resolves.toBeInstanceOf(Pattern);
  await expect(getPattern(id)).resolves.toHaveProperty('active', false);
  await expect(getPattern(id)).resolves.toHaveProperty(
    'pattern',
    DUMMY_TEXT2_XS,
  );
});

test('Delete pattern', async () => {
  await expect(getPatterns()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
  const patterns = await getPatterns();
  const { id } = patterns[patterns.length - 1];
  await expect(deletePattern(id)).resolves.toEqual(true);
  await expect(getPatterns()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a pattern inexistent', async () => {
  await expect(deletePattern(INEXISTENT_INDEX)).rejects.toThrowError(
    PATTERN_NOT_FOUND,
  );
});
