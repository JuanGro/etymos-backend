import { Word } from '../../models/word';
import { WordResolver } from '.';
import {
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  WORD_NOT_FOUND,
  DUMMY_IMAGE_URL,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
  DUMMY_TEXT2_XS,
  DUMMY_WORD,
  DUMMY_WORD_INCORRECT,
  DUMMY_WORD2,
  DUMMY_TEXT_M,
} from '../../config/constants';

const {
  getWords, getWord, createWord, updateWord, deleteWord,
} = new WordResolver();

test('Get all words', async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get word', async () => {
  const [words] = await getWords();
  const { id } = words;
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
});

test('Get error if word does not exist', async () => {
  await expect(getWord(INEXISTENT_INDEX)).rejects.toThrowError(WORD_NOT_FOUND);
});

test('Create word', async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createWord(DUMMY_WORD);
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Get error if tries to create a word with incorrect word length', async () => {
  await expect(
    createWord(DUMMY_WORD_INCORRECT),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a word with duplicate word', async () => {
  await expect(
    createWord(DUMMY_WORD),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update word', async () => {
  const { id } = await updateWord(1, DUMMY_WORD2);
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
  await expect(getWord(id)).resolves.toHaveProperty('active', true);
  await expect(getWord(id)).resolves.toHaveProperty('word', DUMMY_TEXT2_XS);
  await expect(getWord(id)).resolves.toHaveProperty('meaning', DUMMY_TEXT_M);
  await expect(getWord(id)).resolves.toHaveProperty(
    'imageUrl',
    DUMMY_IMAGE_URL,
  );
});

test('Delete word', async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const words = await getWords();
  const { id } = words[words.length - 1];
  await expect(deleteWord(id)).resolves.toBeInstanceOf(Word);
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a word inexistent', async () => {
  await expect(deleteWord(INEXISTENT_INDEX)).rejects.toThrowError(
    WORD_NOT_FOUND,
  );
});
