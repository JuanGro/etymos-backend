import { Version } from '../../models/Version';
import { VersionResolver } from '.';
import {
  FAKER_ELEMENTS_NUMBER_L, INEXISTENT_INDEX, DUMMY_TEXT_M, DUMMY_TEXT_L, DUMMY_VERSION, DUMMY_VERSION2, ERROR_DUPLICATE_KEY, ERROR_MAX_LENGTH, VERSION_NOT_FOUND,
} from '../../config/constants';

const {
  getVersions, getVersion, createVersion, updateVersion, deleteVersion,
} = new VersionResolver();

test('Get all versions', async () => {
  await expect(getVersions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get version', async () => {
  const [versions] = await getVersions();
  const { id } = versions;
  await expect(getVersion(id)).resolves.toBeInstanceOf(Version);
});

test('Get error if version does not exist', async () => {
  await expect(getVersion(INEXISTENT_INDEX)).rejects.toThrowError(VERSION_NOT_FOUND);
});

test('Create version', async () => {
  await expect(getVersions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createVersion({
    version: DUMMY_VERSION,
    description: DUMMY_TEXT_M,
    maintenance: false,
    active: true,
  });
  await expect(getVersion(id)).resolves.toBeInstanceOf(Version);
  await expect(getVersions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Get error if tries to create a version with incorrect version length', async () => {
  await expect(
    createVersion({
      version:
        DUMMY_TEXT_L,
      description: DUMMY_TEXT_M,
      maintenance: true,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a version with duplicate version', async () => {
  await expect(
    createVersion({
      version: DUMMY_VERSION,
      description: DUMMY_TEXT_M,
      maintenance: true,
      active: true,
    }),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update version', async () => {
  const { id } = await updateVersion(1, {
    version: DUMMY_VERSION2,
    description: DUMMY_TEXT_M,
    maintenance: false,
    active: false,
  });
  await expect(getVersion(id)).resolves.toBeInstanceOf(Version);
  await expect(getVersion(id)).resolves.toHaveProperty(
    'active',
    false,
  );
  await expect(getVersion(id)).resolves.toHaveProperty(
    'maintenance',
    false,
  );
  await expect(getVersion(id)).resolves.toHaveProperty(
    'version',
    DUMMY_VERSION2,
  );
  await expect(getVersion(id)).resolves.toHaveProperty(
    'description',
    DUMMY_TEXT_M,
  );
});

test('Delete version', async () => {
  await expect(getVersions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const versions = await getVersions();
  const { id } = versions[versions.length - 1];
  await expect(deleteVersion(id)).resolves.toEqual(true);
  await expect(getVersions()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a version inexistent', async () => {
  await expect(deleteVersion(INEXISTENT_INDEX)).rejects.toThrowError(VERSION_NOT_FOUND);
});
