import { Category } from "../../models/Category";
import { dbConnection } from "../../tests/config/databaseConnection";
import { CategoryResolver } from ".";

dbConnection();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = new CategoryResolver();

test("Get all categories", () => {
  expect(getCategories()).resolves.toHaveLength(10);
});

test("Get category", async () => {
  const categories = await getCategories();
  const firstCategory = categories[0];
  expect(getCategory(firstCategory.id)).resolves.toBeInstanceOf(Category);
});

test("Get error if category does not exist", () => {
  expect(getCategory(10000)).rejects.toThrowError();
});

test("Create category", async () => {
  expect(getCategories()).resolves.toHaveLength(10);
  const categoryCreated = await createCategory({
    name: "animal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: true,
  });
  expect(getCategory(categoryCreated.id)).resolves.toBeInstanceOf(Category);
  expect(getCategories()).resolves.toHaveLength(11);
});

test("Get error if tries to create a category with incorrect name length", () => {
  expect(
    createCategory({
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      active: false,
    })
  ).rejects.toThrowError();
});

test("Update category", async () => {
  const categoryUpdated = await updateCategory(1, {
    name: "automobile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: false,
  });
  expect(getCategory(categoryUpdated.id)).resolves.toBeInstanceOf(Category);
  expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "name",
    "automobile"
  );
  expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "description",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
});

test("Delete category", async () => {
  expect(getCategories()).resolves.toHaveLength(11);
  const categories = await getCategories();
  const lastCategory = categories[categories.length - 1];
  expect(deleteCategory(lastCategory.id)).resolves.toBeTruthy();
  expect(getCategories()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a category inexistent", () => {
  expect(deleteCategory(10000)).rejects.toThrowError();
});
