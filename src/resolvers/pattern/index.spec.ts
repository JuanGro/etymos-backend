import { Pattern } from "../../models/Pattern";
import { dbConnection } from "../../tests/config/databaseConnection";
import { PatternResolver } from ".";

dbConnection();

const { getPatterns, getPattern, createPattern, updatePattern, deletePattern } =
  new PatternResolver();

test("Get all patterns", async () => {
  expect(getPatterns()).resolves.toHaveLength(10);
});

test("Get pattern", async () => {
  const patterns = await getPatterns();
  const firstPattern = patterns[0];
  expect(getPattern(firstPattern.id)).resolves.toBeInstanceOf(Pattern);
});

test("Get error if pattern does not exist", () => {
  expect(getPattern(10000)).rejects.toThrowError();
});

test("Create pattern", async () => {
  expect(getPatterns()).resolves.toHaveLength(10);
  const patternCreated = await createPattern({
    pattern: "lorem",
    active: true,
  });
  expect(getPattern(patternCreated.id)).resolves.toBeInstanceOf(Pattern);
  expect(getPatterns()).resolves.toHaveLength(11);
});

test("Get error if tries to create a pattern with incorrect name length", () => {
  expect(
    createPattern({
      pattern:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      active: true,
    })
  ).rejects.toThrowError();
});

test("Update pattern", async () => {
  const patternUpdated = await updatePattern(1, {
    pattern: "hipo",
    active: false,
  });
  expect(getPattern(patternUpdated.id)).resolves.toBeInstanceOf(Pattern);
  expect(getPattern(patternUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  expect(getPattern(patternUpdated.id)).resolves.toHaveProperty(
    "pattern",
    "hipo"
  );
});

test("Delete pattern", async () => {
  expect(getPatterns()).resolves.toHaveLength(11);
  const patterns = await getPatterns();
  const lastPattern = patterns[patterns.length - 1];
  expect(deletePattern(lastPattern.id)).resolves.toEqual(true);
  expect(getPatterns()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a pattern inexistent", () => {
  expect(deletePattern(10000)).rejects.toThrowError();
});
