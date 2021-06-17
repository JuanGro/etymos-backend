import { Category } from "../../models/Category";
import { dbConnection } from "../../tests/config/databaseConnection";
import { CategoryResolver } from ".";

dbConnection();

const categoryResolver = new CategoryResolver();

test("Get all categories", () => {
  expect(categoryResolver.getCategories()).resolves.toHaveLength(10);
});

test("Get category", async () => {
  const categories = await categoryResolver.getCategories();
  const { id } = categories[0];
  expect(categoryResolver.getCategory(id)).resolves.toBeInstanceOf(Category);
});

test("Get error if category does not exist", () => {
  expect(categoryResolver.getCategory(10000)).rejects.toThrowError();
});

test("Create category", async () => {
  expect(categoryResolver.getCategories()).resolves.toHaveLength(10);
  const categoryCreated = await categoryResolver.createCategory({
    name: "animal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: true,
  });
  expect(categoryResolver.getCategory(categoryCreated.id)).resolves.toBeInstanceOf(Category);
  expect(categoryResolver.getCategories()).resolves.toHaveLength(11);
});

test("Get error if tries to create a category with incorrect name length", () => {
  expect(
    categoryResolver.createCategory({
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      active: false
    })
  ).rejects.toThrowError();
});

test("Update category", async () => {
  const categoryUpdated = await categoryResolver.updateCategory(1, {
    name: "automobile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: false,
  });
  expect(categoryResolver.getCategory(categoryUpdated.id)).resolves.toBeInstanceOf(Category);
  expect(categoryResolver.getCategory(categoryUpdated.id)).resolves.toHaveProperty("active", false);
  expect(categoryResolver.getCategory(categoryUpdated.id)).resolves.toHaveProperty("name", "automobile");
  expect(categoryResolver.getCategory(categoryUpdated.id)).resolves.toHaveProperty("description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
});

test("Delete category", async () => {
  expect(categoryResolver.getCategories()).resolves.toHaveLength(11);
  const categories = await categoryResolver.getCategories();
  const lastCategory = categories[categories.length - 1];
  expect(categoryResolver.deleteCategory(lastCategory.id)).resolves.toBeTruthy();
  expect(categoryResolver.getCategories()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a category inexistent", () => {
  expect(categoryResolver.deleteCategory(10000)).rejects.toThrowError();
});
