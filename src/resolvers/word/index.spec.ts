import { Word } from "../../models/Word";
import { dbConnection } from "../../tests/config/databaseConnection";
import { WordResolver } from ".";

dbConnection();

const wordResolver = new WordResolver();

test("Get all words", async () => {
  expect((await wordResolver.getWords()).length).toEqual(10);
});

test("Get word", async () => {
  const words = await wordResolver.getWords();
  const firstWord = words[0];
  expect(await wordResolver.getWord(firstWord.id)).toBeInstanceOf(Word);
});

test("Get error if word does not exist", async () => {
  expect(async () => {
    await wordResolver.getWord(10000);
  }).rejects.toThrowError();
});

test("Create word", async () => {
  expect((await wordResolver.getWords()).length).toEqual(10);
  const wordCreated = await wordResolver.createWord({
    word: "Lorem",
    meaning: "Lorem ipsum dolor sit amet",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    categoryId: 1,
    active: true
  });
  expect(await wordResolver.getWord(wordCreated.id)).toBeInstanceOf(Word);
  expect((await wordResolver.getWords()).length).toEqual(11);
});

test("Get error if tries to create a word with incorrect name length", async () => {
  expect(async () => {
    await wordResolver.createWord({
      word:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      meaning: "Lorem ipsum dolor sit amet",
      imageUrl:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
      categoryId: 1,
      active: true
    });
  }).rejects.toThrowError();
});

test("Update word", async () => {
  const wordUpdated = await wordResolver.updateWord(1, {
    word: "Lorems",
    meaning: "Lorem ipsum dolor sit amet",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    categoryId: 1,
    active: false
  });
  expect(await wordResolver.getWord(wordUpdated.id)).toBeInstanceOf(Word);
  expect((await wordResolver.getWord(wordUpdated.id)).active).toBeFalsy();
  expect((await wordResolver.getWord(wordUpdated.id)).word).toBe("Lorems");
});

test("Delete word", async () => {
  expect((await wordResolver.getWords()).length).toEqual(11);
  const words = await wordResolver.getWords();
  const lastWord = words[words.length - 1];
  const wordDeleted = await wordResolver.deleteWord(lastWord.id);
  expect(wordDeleted).toEqual(true);
  expect((await wordResolver.getWords()).length).toEqual(10);
});

test("Get error if tries to delete a word inexistent", async () => {
  expect(async () => {
    await wordResolver.deleteWord(10000);
  }).rejects.toThrowError();
});
