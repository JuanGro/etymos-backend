import { Word } from "../../models/Word";
import { WordResolver } from ".";
import { FAKER_ELEMENTS_NUMBER_L, INEXISTENT_INDEX, DUMMY_TEXT_XS, DUMMY_TEXT_L, WORD_NOT_FOUND, DUMMY_TEXT_S, DUMMY_IMAGE_URL, ERROR_DUPLICATE_KEY, ERROR_MAX_LENGTH, DUMMY_TEXT2_XS } from "../../config/constants";

const { getWords, getWord, createWord, updateWord, deleteWord } =
  new WordResolver();

test("Get all words", async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test("Get word", async () => {
  const [words] = await getWords();
  const { id } = words;
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
});

test("Get error if word does not exist", async () => {
  await expect(getWord(INEXISTENT_INDEX)).rejects.toThrowError(WORD_NOT_FOUND);
});

test("Create word", async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createWord({
    word: DUMMY_TEXT_XS,
    meaning: DUMMY_TEXT_S,
    imageUrl:
      DUMMY_IMAGE_URL,
    categoryId: 1,
    active: true,
  });
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test("Get error if tries to create a word with incorrect word length", async () => {
  await expect(
    createWord({
      word: DUMMY_TEXT_L,
      meaning: DUMMY_TEXT_S,
      imageUrl:
        DUMMY_IMAGE_URL,
      categoryId: 1,
      active: true,
    })
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test("Get error if tries to create a word with duplicate word", async () => {
  await expect(
    createWord({
      word: DUMMY_TEXT_XS,
      meaning: DUMMY_TEXT_S,
      imageUrl:
        DUMMY_IMAGE_URL,
      categoryId: 1,
      active: true,
    })
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test("Update word", async () => {
  const { id } = await updateWord(1, {
    word: DUMMY_TEXT2_XS,
    meaning: DUMMY_TEXT_S,
    imageUrl:
      DUMMY_IMAGE_URL,
    categoryId: 1,
    active: false,
  });
  await expect(getWord(id)).resolves.toBeInstanceOf(Word);
  await expect(getWord(id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getWord(id)).resolves.toHaveProperty(
    "word",
    DUMMY_TEXT2_XS
  );
  await expect(getWord(id)).resolves.toHaveProperty(
    "meaning",
    DUMMY_TEXT_S
  );
  await expect(getWord(id)).resolves.toHaveProperty(
    "imageUrl",
    DUMMY_IMAGE_URL
  );
});

test("Delete word", async () => {
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const words = await getWords();
  const { id } = words[words.length - 1];
  await expect(deleteWord(id)).resolves.toEqual(true);
  await expect(getWords()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test("Get error if tries to delete a word inexistent", async () => {
  await expect(deleteWord(INEXISTENT_INDEX)).rejects.toThrowError(WORD_NOT_FOUND);
});
