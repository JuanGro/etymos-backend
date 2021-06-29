import { Reference } from '../../models/reference';
import { ReferenceResolver } from '.';
import {
  FAKER_ELEMENTS_NUMBER_L,
  INEXISTENT_INDEX,
  ERROR_DUPLICATE_KEY,
  ERROR_MAX_LENGTH,
  REFERENCE_NOT_FOUND,
  DUMMY_TEXT2_XS,
  DUMMY_YEAR_STRING,
  DUMMY_REFERENCE2,
  DUMMY_REFERENCE,
  DUMMY_REFERENCE_INCORRECT,
  DUMMY_TEXT_M,
} from '../../config/constants';

const {
  getReferences,
  getReference,
  createReference,
  updateReference,
  deleteReference,
} = new ReferenceResolver();

test('Get all references', async () => {
  await expect(getReferences()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get reference', async () => {
  const [references] = await getReferences();
  const { id } = references;
  await expect(getReference(id)).resolves.toBeInstanceOf(Reference);
});

test('Get error if reference does not exist', async () => {
  await expect(getReference(INEXISTENT_INDEX)).rejects.toThrowError(
    REFERENCE_NOT_FOUND,
  );
});

test('Create reference', async () => {
  await expect(getReferences()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createReference(DUMMY_REFERENCE);
  await expect(getReference(id)).resolves.toBeInstanceOf(Reference);
  await expect(getReferences()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
});

test('Get error if tries to create a reference with incorrect author length', async () => {
  await expect(
    createReference(DUMMY_REFERENCE_INCORRECT),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a reference with duplicate title', async () => {
  await expect(
    createReference(DUMMY_REFERENCE),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update reference', async () => {
  const { id } = await updateReference(1, DUMMY_REFERENCE2);
  await expect(getReference(id)).resolves.toBeInstanceOf(Reference);
  await expect(getReference(id)).resolves.toHaveProperty('active', false);
  await expect(getReference(id)).resolves.toHaveProperty(
    'title',
    DUMMY_TEXT2_XS,
  );
  await expect(getReference(id)).resolves.toHaveProperty(
    'author',
    DUMMY_TEXT_M,
  );
  await expect(getReference(id)).resolves.toHaveProperty(
    'publicationYear',
    DUMMY_YEAR_STRING,
  );
  await expect(getReference(id)).resolves.toHaveProperty(
    'publicationPlace',
    DUMMY_TEXT_M,
  );
  await expect(getReference(id)).resolves.toHaveProperty(
    'publishingCompany',
    DUMMY_TEXT_M,
  );
});

test('Delete reference', async () => {
  await expect(getReferences()).resolves.toHaveLength(
    FAKER_ELEMENTS_NUMBER_L + 1,
  );
  const references = await getReferences();
  const { id } = references[references.length - 1];
  await expect(deleteReference(id)).resolves.toBeInstanceOf(Reference);
  await expect(getReferences()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a reference inexistent', async () => {
  await expect(deleteReference(INEXISTENT_INDEX)).rejects.toThrowError(
    REFERENCE_NOT_FOUND,
  );
});
