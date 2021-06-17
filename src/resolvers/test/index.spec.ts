import { Test } from "../../models/Test";
import { dbConnection } from "../../tests/config/databaseConnection";
import { TestResolver } from ".";

dbConnection();

const testResolver = new TestResolver();

test("Get all tests", () => {
  expect(testResolver.getTests()).resolves.toHaveLength(10);
});

test("Get test", async () => {
  const tests = await testResolver.getTests();
  const firstTest = tests[0];
  expect(testResolver.getTest(firstTest.id)).resolves.toBeInstanceOf(Test);
});

test("Get error if test does not exist", () => {
  expect(testResolver.getTest(10000)).rejects.toThrowError();
});

test("Create test", async () => {
  expect(testResolver.getTests()).resolves.toHaveLength(10);
  const testCreated = await testResolver.createTest({
    userId: 1,
    questionId: 1,
    active: true
  });
  expect(testResolver.getTest(testCreated.id)).resolves.toBeInstanceOf(Test);
  expect(testResolver.getTests()).resolves.toHaveLength(11);
});

test("Update test", async () => {
  const testUpdated = await testResolver.updateTest(1, {
    userId: 1,
    questionId: 1,
    active: false
  });
  expect(testResolver.getTest(testUpdated.id)).resolves.toBeInstanceOf(Test);
  expect(testResolver.getTest(testUpdated.id)).resolves.toHaveProperty("active", false);
});

test("Delete test", async () => {
  expect(testResolver.getTests()).resolves.toHaveLength(11);
  const tests = await testResolver.getTests();
  const lastTest = tests[tests.length - 1];
  expect(testResolver.deleteTest(lastTest.id)).resolves.toEqual(true);
  expect(testResolver.getTests()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a test inexistent", () => {
  expect(testResolver.deleteTest(10000)).rejects.toThrowError();
});
