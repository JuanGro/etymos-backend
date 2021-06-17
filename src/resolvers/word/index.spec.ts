import { Word } from "../../models/Word";
import { dbConnection } from "../../tests/config/databaseConnection";
import { WordResolver } from ".";

dbConnection();

const { getWords, getWord, createWord, updateWord, deleteWord } =
  new WordResolver();

test("Get all words", () => {
  expect(getWords()).resolves.toHaveLength(10);
});

test("Get word", async () => {
  const words = await getWords();
  const firstWord = words[0];
  expect(getWord(firstWord.id)).resolves.toBeInstanceOf(Word);
});

test("Get error if word does not exist", () => {
  expect(getWord(10000)).rejects.toThrowError();
});

test("Create word", async () => {
  expect(getWords()).resolves.toHaveLength(10);
  const wordCreated = await createWord({
    word: "Lorem",
    meaning: "Lorem ipsum dolor sit amet",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    categoryId: 1,
    active: true,
  });
  expect(getWord(wordCreated.id)).resolves.toBeInstanceOf(Word);
  expect(getWords()).resolves.toHaveLength(11);
});

test("Get error if tries to create a word with incorrect name length", async () => {
  expect(
    createWord({
      word: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      meaning: "Lorem ipsum dolor sit amet",
      imageUrl:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
      categoryId: 1,
      active: true,
    })
  ).rejects.toThrowError();
});

test("Update word", async () => {
  const wordUpdated = await updateWord(1, {
    word: "Lorems",
    meaning: "Lorem ipsum dolor sit amet",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    categoryId: 1,
    active: false,
  });
  expect(getWord(wordUpdated.id)).resolves.toBeInstanceOf(Word);
  expect(getWord(wordUpdated.id)).resolves.toHaveProperty("active", false);
  expect(getWord(wordUpdated.id)).resolves.toHaveProperty("word", "Lorems");
  expect(getWord(wordUpdated.id)).resolves.toHaveProperty(
    "meaning",
    "Lorem ipsum dolor sit amet"
  );
  expect(getWord(wordUpdated.id)).resolves.toHaveProperty(
    "imageUrl",
    "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg"
  );
});

test("Delete word", async () => {
  expect(getWords()).resolves.toHaveLength(11);
  const words = await getWords();
  const lastWord = words[words.length - 1];
  expect(deleteWord(lastWord.id)).resolves.toEqual(true);
  expect(getWords()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a word inexistent", () => {
  expect(deleteWord(10000)).rejects.toThrowError();
});
