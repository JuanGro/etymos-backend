import { Etymology } from '../../models/etymology';
import { EtymologyResolver } from '.';
import {
  DUMMY_ETYMOLOGY,
  DUMMY_ETYMOLOGY2,
  DUMMY_ETYMOLOGY_INCORRECT,
  DUMMY_IMAGE_URL,
  DUMMY_TEXT2_XS,
  DUMMY_TEXT_M,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
  ETYMOLOGY_NOT_FOUND,
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
} from '../../config/constants';

const {
  getEtymologies,
  getEtymology,
  createEtymology,
  updateEtymology,
  deleteEtymology,
} = new EtymologyResolver();

test('Get all etymologies', async () => {
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get etymology', async () => {
  const [etymologies] = await getEtymologies();
  const { id } = etymologies;
  await expect(getEtymology(id)).resolves.toBeInstanceOf(Etymology);
});

test('Get error if etymology does not exist', async () => {
  await expect(getEtymology(INEXISTENT_INDEX)).rejects.toThrowError(
    ETYMOLOGY_NOT_FOUND,
  );
});

test('Create etymology', async () => {
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createEtymology(DUMMY_ETYMOLOGY);
  await expect(getEtymology(id)).resolves.toBeInstanceOf(Etymology);
  await expect(getEtymologies()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
});

test('Get error if tries to create an etymology with incorrect graecoLatinEtymology length', async () => {
  await expect(
    createEtymology(DUMMY_ETYMOLOGY_INCORRECT),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create an etymology with duplicate graecoLatinEtymology', async () => {
  await expect(
    createEtymology(DUMMY_ETYMOLOGY),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update etymology', async () => {
  const { id } = await updateEtymology(1, DUMMY_ETYMOLOGY2);
  await expect(getEtymology(id)).resolves.toBeInstanceOf(Etymology);
  await expect(getEtymology(id)).resolves.toHaveProperty('active', true);
  await expect(getEtymology(id)).resolves.toHaveProperty(
    'graecoLatinEtymology',
    DUMMY_TEXT2_XS,
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    'meaning',
    DUMMY_TEXT_M,
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    'imageUrl',
    DUMMY_IMAGE_URL,
  );
});

test('Delete etymology', async () => {
  await expect(getEtymologies()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
  const etymologies = await getEtymologies();
  const { id } = etymologies[etymologies.length - 1];
  await expect(deleteEtymology(id)).resolves.toBeInstanceOf(Etymology);
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete an etymology inexistent', async () => {
  await expect(deleteEtymology(INEXISTENT_INDEX)).rejects.toThrowError(
    ETYMOLOGY_NOT_FOUND,
  );
});
