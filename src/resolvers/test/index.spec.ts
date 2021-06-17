import { Test } from "../../models/Test";
import { dbConnection } from "../../tests/config/databaseConnection";
import { TestResolver } from ".";

dbConnection();

const testResolver = new TestResolver();

test("Get all tests", async () => {
  expect((await testResolver.getTests()).length).toEqual(10);
});

test("Get test", async () => {
  const tests = await testResolver.getTests();
  const firstTest = tests[0];
  expect(await testResolver.getTest(firstTest.id)).toBeInstanceOf(Test);
});

test("Get error if test does not exist", async () => {
  expect(async () => {
    await testResolver.getTest(10000);
  }).rejects.toThrowError();
});

test("Create test", async () => {
  expect((await testResolver.getTests()).length).toEqual(10);
  const testCreated = await testResolver.createTest({
    userId: 1,
    questionId: 1,
    active: true
  });
  expect(await testResolver.getTest(testCreated.id)).toBeInstanceOf(Test);
  expect((await testResolver.getTests()).length).toEqual(11);
});

test("Update test", async () => {
  const testUpdated = await testResolver.updateTest(1, {
    userId: 1,
    questionId: 1,
    active: false
  });
  expect(await testResolver.getTest(testUpdated.id)).toBeInstanceOf(Test);
  expect((await testResolver.getTest(testUpdated.id)).active).toBeFalsy();
});

test("Delete test", async () => {
  expect((await testResolver.getTests()).length).toEqual(11);
  const tests = await testResolver.getTests();
  const lastTest = tests[tests.length - 1];
  const testDeleted = await testResolver.deleteTest(lastTest.id);
  expect(testDeleted).toEqual(true);
  expect((await testResolver.getTests()).length).toEqual(10);
});

test("Get error if tries to delete a test inexistent", async () => {
  expect(async () => {
    await testResolver.deleteTest(10000);
  }).rejects.toThrowError();
});
