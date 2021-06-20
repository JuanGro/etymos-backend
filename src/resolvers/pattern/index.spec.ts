import { Pattern } from "../../models/Pattern";
import { PatternResolver } from ".";

const { getPatterns, getPattern, createPattern, updatePattern, deletePattern } =
  new PatternResolver();

test("Get all patterns", async () => {
  await expect(getPatterns()).resolves.toHaveLength(10);
});

test("Get pattern", async () => {
  const patterns = await getPatterns();
  const firstPattern = patterns[0];
  await expect(getPattern(firstPattern.id)).resolves.toBeInstanceOf(Pattern);
});

test("Get error if pattern does not exist", async () => {
  await expect(getPattern(10000)).rejects.toThrowError();
});

test("Create pattern", async () => {
  await expect(getPatterns()).resolves.toHaveLength(10);
  const patternCreated = await createPattern({
    pattern: "lorem",
    active: true,
  });
  await expect(getPattern(patternCreated.id)).resolves.toBeInstanceOf(Pattern);
  await expect(getPatterns()).resolves.toHaveLength(11);
});

test("Get error if tries to create a pattern with incorrect pattern length", async () => {
  await expect(
    createPattern({
      pattern:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      active: true,
    })
  ).rejects.toThrowError("value too long for type character varying(16)");
});

test("Get error if tries to create a pattern with duplicate pattern", async () => {
  await expect(
    createPattern({
      pattern: "lorem",
      active: true,
    })
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update pattern", async () => {
  const patternUpdated = await updatePattern(1, {
    pattern: "hipo",
    active: false,
  });
  await expect(getPattern(patternUpdated.id)).resolves.toBeInstanceOf(Pattern);
  await expect(getPattern(patternUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getPattern(patternUpdated.id)).resolves.toHaveProperty(
    "pattern",
    "hipo"
  );
});

test("Delete pattern", async () => {
  await expect(getPatterns()).resolves.toHaveLength(11);
  const patterns = await getPatterns();
  const lastPattern = patterns[patterns.length - 1];
  await expect(deletePattern(lastPattern.id)).resolves.toEqual(true);
  await expect(getPatterns()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a pattern inexistent", async () => {
  await expect(deletePattern(10000)).rejects.toThrowError();
});
