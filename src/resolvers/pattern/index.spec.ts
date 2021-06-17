import { Pattern } from "../../models/Pattern";
import { dbConnection } from "../../tests/config/databaseConnection";
import { PatternResolver } from ".";

dbConnection();

const patternResolver = new PatternResolver();

test("Get all patterns", async () => {
  expect((await patternResolver.getPatterns()).length).toEqual(10);
});

test("Get pattern", async () => {
  const patterns = await patternResolver.getPatterns();
  const firstPattern = patterns[0];
  expect(await patternResolver.getPattern(firstPattern.id)).toBeInstanceOf(
    Pattern
  );
});

test("Get error if pattern does not exist", async () => {
  expect(async () => {
    await patternResolver.getPattern(10000);
  }).rejects.toThrowError();
});

test("Create pattern", async () => {
  expect((await patternResolver.getPatterns()).length).toEqual(10);
  const patternCreated = await patternResolver.createPattern({
    pattern: "lorem",
    active: true
  });
  expect(await patternResolver.getPattern(patternCreated.id)).toBeInstanceOf(
    Pattern
  );
  expect((await patternResolver.getPatterns()).length).toEqual(11);
});

test("Get error if tries to create a pattern with incorrect name length", async () => {
  expect(async () => {
    await patternResolver.createPattern({
      pattern:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      active: true
    });
  }).rejects.toThrowError();
});

test("Update pattern", async () => {
  const patternUpdated = await patternResolver.updatePattern(1, {
    pattern: "hipo",
    active: false
  });
  expect(await patternResolver.getPattern(patternUpdated.id)).toBeInstanceOf(
    Pattern
  );
  expect((await patternResolver.getPattern(patternUpdated.id)).active).toBeFalsy();
  expect((await patternResolver.getPattern(patternUpdated.id)).pattern).toBe("hipo");
});

test("Delete pattern", async () => {
  expect((await patternResolver.getPatterns()).length).toEqual(11);
  const patterns = await patternResolver.getPatterns();
  const lastPattern = patterns[patterns.length - 1];
  const patternDeleted = await patternResolver.deletePattern(lastPattern.id);
  expect(patternDeleted).toEqual(true);
  expect((await patternResolver.getPatterns()).length).toEqual(10);
});

test("Get error if tries to delete a pattern inexistent", async () => {
  expect(async () => {
    await patternResolver.deletePattern(10000);
  }).rejects.toThrowError();
});
