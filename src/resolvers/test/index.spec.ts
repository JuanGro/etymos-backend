import { Test } from "../../models/Test";
import { dbConnection } from "../../tests/config/databaseConnection";
import { TestResolver } from ".";

dbConnection();

const { getTests, getTest, createTest, updateTest, deleteTest } = new TestResolver();

test("Get all tests", () => {
  expect(getTests()).resolves.toHaveLength(10);
});

test("Get test", async () => {
  const tests = await getTests();
  const firstTest = tests[0];
  expect(getTest(firstTest.id)).resolves.toBeInstanceOf(Test);
});

test("Get error if test does not exist", () => {
  expect(getTest(10000)).rejects.toThrowError();
});

test("Create test", async () => {
  expect(getTests()).resolves.toHaveLength(10);
  const testCreated = await createTest({
    userId: 1,
    questionId: 1,
    active: true
  });
  expect(getTest(testCreated.id)).resolves.toBeInstanceOf(Test);
  expect(getTests()).resolves.toHaveLength(11);
});

test("Update test", async () => {
  const testUpdated = await updateTest(1, {
    userId: 1,
    questionId: 1,
    active: false
  });
  expect(getTest(testUpdated.id)).resolves.toBeInstanceOf(Test);
  expect(getTest(testUpdated.id)).resolves.toHaveProperty("active", false);
});

test("Delete test", async () => {
  expect(getTests()).resolves.toHaveLength(11);
  const tests = await getTests();
  const lastTest = tests[tests.length - 1];
  expect(deleteTest(lastTest.id)).resolves.toEqual(true);
  expect(getTests()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a test inexistent", () => {
  expect(deleteTest(10000)).rejects.toThrowError();
});
