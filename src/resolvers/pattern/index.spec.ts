import { Pattern } from "../../models/Pattern";
import { dbConnection } from "../../tests/config/databaseConnection";
import { PatternResolver } from ".";

dbConnection();

const patternResolver = new PatternResolver();

test("Get all patterns", async () => {
  expect(patternResolver.getPatterns()).resolves.toHaveLength(10);
});

test("Get pattern", async () => {
  const patterns = await patternResolver.getPatterns();
  const firstPattern = patterns[0];
  expect(patternResolver.getPattern(firstPattern.id)).resolves.toBeInstanceOf(Pattern);
});

test("Get error if pattern does not exist", () => {
  expect(patternResolver.getPattern(10000)).rejects.toThrowError();
});

test("Create pattern", async () => {
  expect(patternResolver.getPatterns()).resolves.toHaveLength(10);
  const patternCreated = await patternResolver.createPattern({
    pattern: "lorem",
    active: true
  });
  expect(patternResolver.getPattern(patternCreated.id)).resolves.toBeInstanceOf(Pattern);
  expect(patternResolver.getPatterns()).resolves.toHaveLength(11);
});

test("Get error if tries to create a pattern with incorrect name length", () => {
  expect(patternResolver.createPattern({
      pattern:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      active: true
    })).rejects.toThrowError();
});

test("Update pattern", async () => {
  const patternUpdated = await patternResolver.updatePattern(1, {
    pattern: "hipo",
    active: false
  });
  expect(patternResolver.getPattern(patternUpdated.id)).resolves.toBeInstanceOf(Pattern);
  expect(patternResolver.getPattern(patternUpdated.id)).resolves.toHaveProperty("active", false);
  expect(patternResolver.getPattern(patternUpdated.id)).resolves.toHaveProperty("pattern", "hipo");
});

test("Delete pattern", async () => {
  expect(patternResolver.getPatterns()).resolves.toHaveLength(11);
  const patterns = await patternResolver.getPatterns();
  const lastPattern = patterns[patterns.length - 1];
  expect(patternResolver.deletePattern(lastPattern.id)).resolves.toEqual(true);
  expect(patternResolver.getPatterns()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a pattern inexistent", () => {
  expect(patternResolver.deletePattern(10000)).rejects.toThrowError();
});
