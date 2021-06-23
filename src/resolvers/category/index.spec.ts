import { Category } from '../../models/Category';
import { CategoryResolver } from '.';
import {
  CATEGORY_NOT_FOUND, DUMMY_TEXT2_XS, DUMMY_TEXT_S, DUMMY_TEXT_XL, DUMMY_TEXT_XS, ERROR_DUPLICATE_KEY, ERROR_MAX_LENGTH, FAKER_ELEMENTS_NUMBER_L, INEXISTENT_INDEX,
} from '../../config/constants';

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = new CategoryResolver();

test('Get all categories', async () => {
  await expect(getCategories()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get category', async () => {
  const [categories] = await getCategories();
  const { id } = categories;
  await expect(getCategory(id)).resolves.toBeInstanceOf(Category);
});

test('Get error if category does not exist', async () => {
  await expect(getCategory(INEXISTENT_INDEX)).rejects.toThrowError(CATEGORY_NOT_FOUND);
});

test('Create category', async () => {
  await expect(getCategories()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
  const { id } = await createCategory({
    name: DUMMY_TEXT_XS,
    description: DUMMY_TEXT_S,
    active: true,
  });
  await expect(getCategory(id)).resolves.toBeInstanceOf(
    Category,
  );
  await expect(getCategories()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
});

test('Get error if tries to create a category with incorrect name length', async () => {
  await expect(
    createCategory({
      name: DUMMY_TEXT_XL,
      description: DUMMY_TEXT_S,
      active: false,
    }),
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test('Get error if tries to create a category with duplicate name', async () => {
  await expect(
    createCategory({
      name: DUMMY_TEXT_XS,
      description: DUMMY_TEXT_S,
      active: false,
    }),
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test('Update category', async () => {
  const { id } = await updateCategory(1, {
    name: DUMMY_TEXT2_XS,
    description: DUMMY_TEXT_S,
    active: false,
  });
  await expect(getCategory(id)).resolves.toBeInstanceOf(
    Category,
  );
  await expect(getCategory(id)).resolves.toHaveProperty(
    'active',
    false,
  );
  await expect(getCategory(id)).resolves.toHaveProperty(
    'name',
    DUMMY_TEXT2_XS,
  );
  await expect(getCategory(id)).resolves.toHaveProperty(
    'description',
    DUMMY_TEXT_S,
  );
});

test('Delete category', async () => {
  await expect(getCategories()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L + 1);
  const categories = await getCategories();
  const { id } = categories[categories.length - 1];
  await expect(deleteCategory(id)).resolves.toBeTruthy();
  await expect(getCategories()).resolves.toHaveLength(FAKER_ELEMENTS_NUMBER_L);
});

test('Get error if tries to delete a category inexistent', async () => {
  await expect(deleteCategory(INEXISTENT_INDEX)).rejects.toThrowError(
    CATEGORY_NOT_FOUND,
  );
});
