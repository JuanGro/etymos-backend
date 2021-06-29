import { Test } from '../../models/test';
import { TestResolver } from '.';
import {
  DUMMY_TEST,
  DUMMY_TEST2,
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  TEST_NOT_FOUND,
} from '../../config/constants';

const {
  getTests, getTest, createTest, updateTest, deleteTest,
} = new TestResolver();

test('Get all tests', async () => {
  await expect(getTests()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get test', async () => {
  const [tests] = await getTests();
  const { id } = tests;
  await expect(getTest(id)).resolves.toBeInstanceOf(Test);
});

test('Get error if test does not exist', async () => {
  await expect(getTest(INEXISTENT_INDEX)).rejects.toThrowError(TEST_NOT_FOUND);
});

test('Create test', async () => {
  await expect(getTests()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createTest(DUMMY_TEST);
  await expect(getTest(id)).resolves.toBeInstanceOf(Test);
  await expect(getTests()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Update test', async () => {
  const { id } = await updateTest(1, DUMMY_TEST2);
  await expect(getTest(id)).resolves.toBeInstanceOf(Test);
  await expect(getTest(id)).resolves.toHaveProperty('active', false);
});

test('Delete test', async () => {
  await expect(getTests()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const tests = await getTests();
  const { id } = tests[tests.length - 1];
  await expect(deleteTest(id)).resolves.toBeInstanceOf(Test);
  await expect(getTests()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a test inexistent', async () => {
  await expect(deleteTest(INEXISTENT_INDEX)).rejects.toThrowError(
    TEST_NOT_FOUND,
  );
});
