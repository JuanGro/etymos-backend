import { Category } from "../../models/Category";
import { dbConnection } from "../../tests/config/databaseConnection";
import { CategoryResolver } from ".";

dbConnection();

const categoryResolver = new CategoryResolver();

test("Get all categories", async () => {
  expect((await categoryResolver.getCategories()).length).toEqual(10);
});

test("Get category", async () => {
  const categories = await categoryResolver.getCategories();
  const firstCategory = categories[0];
  expect(await categoryResolver.getCategory(firstCategory.id)).toBeInstanceOf(
    Category
  );
});

test("Get error if category does not exist", async () => {
  expect(async () => {
    await categoryResolver.getCategory(10000);
  }).rejects.toThrowError();
});

test("Create category", async () => {
  expect((await categoryResolver.getCategories()).length).toEqual(10);
  const categoryCreated = await categoryResolver.createCategory({
    name: "animal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: true,
  });
  expect(await categoryResolver.getCategory(categoryCreated.id)).toBeInstanceOf(
    Category
  );
  expect((await categoryResolver.getCategories()).length).toEqual(11);
});

test("Get error if tries to create a category with incorrect name length", async () => {
  expect(async () => {
    await categoryResolver.createCategory({
      name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      active: false,
    });
  }).rejects.toThrowError();
});

test("Update category", async () => {
  const categoryUpdated = await categoryResolver.updateCategory(1, {
    name: "automobile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: false,
  });
  expect(await categoryResolver.getCategory(categoryUpdated.id)).toBeInstanceOf(
    Category
  );
  expect((await categoryResolver.getCategory(categoryUpdated.id)).active).toBeFalsy();
  expect((await categoryResolver.getCategory(categoryUpdated.id)).name).toBe("automobile");
});

test("Delete category", async () => {
  expect((await categoryResolver.getCategories()).length).toEqual(11);
  const categories = await categoryResolver.getCategories();
  const lastCategory = categories[categories.length - 1];
  const categoryDeleted = await categoryResolver.deleteCategory(
    lastCategory.id
  );
  expect(categoryDeleted).toEqual(true);
  expect((await categoryResolver.getCategories()).length).toEqual(10);
});

test("Get error if tries to delete a category inexistent", async () => {
  expect(async () => {
    await categoryResolver.deleteCategory(10000);
  }).rejects.toThrowError();
});
