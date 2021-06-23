import { Question } from '../../models/Question';
import { QuestionResolver } from '.';
import {
  DUMMY_TEXT2_XS,
  DUMMY_TEXT_M,
  DUMMY_TEXT_XL,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  QUESTION_NOT_FOUND,
} from '../../config/constants';

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = new QuestionResolver();

test('Get all questions', async () => {
  await expect(getQuestions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get question', async () => {
  const [questions] = await getQuestions();
  const { id } = questions;
  await expect(getQuestion(id)).resolves.toBeInstanceOf(Question);
});

test('Get error if question does not exist', async () => {
  await expect(getQuestion(INEXISTENT_INDEX)).rejects.toThrowError(
    QUESTION_NOT_FOUND,
  );
});

test('Create question', async () => {
  await expect(getQuestions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createQuestion({
    sentence: DUMMY_TEXT_M,
    active: true,
    referenceId: 1,
  });
  await expect(getQuestion(id)).resolves.toBeInstanceOf(Question);
  await expect(getQuestions()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
});

test('Get error if tries to create a question with incorrect sentence length', async () => {
  await expect(
    createQuestion({
      sentence: DUMMY_TEXT_XL,
      active: true,
      referenceId: 1,
    }),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a question with duplicate sentence', async () => {
  await expect(
    createQuestion({
      sentence: DUMMY_TEXT_M,
      active: true,
      referenceId: 1,
    }),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update question', async () => {
  const { id } = await updateQuestion(1, {
    sentence: DUMMY_TEXT2_XS,
    active: false,
    referenceId: 1,
  });
  await expect(getQuestion(id)).resolves.toBeInstanceOf(Question);
  await expect(getQuestion(id)).resolves.toHaveProperty('active', false);
  await expect(getQuestion(id)).resolves.toHaveProperty(
    'sentence',
    DUMMY_TEXT2_XS,
  );
});

test('Delete question', async () => {
  await expect(getQuestions()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
  const questions = await getQuestions();
  const { id } = questions[questions.length - 1];
  await expect(deleteQuestion(id)).resolves.toEqual(true);
  await expect(getQuestions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a question inexistent', async () => {
  await expect(deleteQuestion(INEXISTENT_INDEX)).rejects.toThrowError(
    QUESTION_NOT_FOUND,
  );
});
