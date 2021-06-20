import { Test } from "../../models/Test";
import { TestResolver } from ".";

const { getTests, getTest, createTest, updateTest, deleteTest } =
  new TestResolver();

test("Get all tests", async () => {
  await expect(getTests()).resolves.toHaveLength(10);
});

test("Get test", async () => {
  const tests = await getTests();
  const firstTest = tests[0];
  await expect(getTest(firstTest.id)).resolves.toBeInstanceOf(Test);
});

test("Get error if test does not exist", async () => {
  await expect(getTest(10000)).rejects.toThrowError();
});

test("Create test", async () => {
  await expect(getTests()).resolves.toHaveLength(10);
  const testCreated = await createTest({
    userId: 1,
    questionId: 1,
    active: true,
  });
  await expect(getTest(testCreated.id)).resolves.toBeInstanceOf(Test);
  await expect(getTests()).resolves.toHaveLength(11);
});

test("Update test", async () => {
  const testUpdated = await updateTest(1, {
    userId: 1,
    questionId: 1,
    active: false,
  });
  await expect(getTest(testUpdated.id)).resolves.toBeInstanceOf(Test);
  await expect(getTest(testUpdated.id)).resolves.toHaveProperty("active", false);
});

test("Delete test", async () => {
  await expect(getTests()).resolves.toHaveLength(11);
  const tests = await getTests();
  const lastTest = tests[tests.length - 1];
  await expect(deleteTest(lastTest.id)).resolves.toEqual(true);
  await expect(getTests()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a test inexistent", async () => {
  await expect(deleteTest(10000)).rejects.toThrowError();
});
