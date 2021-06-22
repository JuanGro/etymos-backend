import { Category } from "../../models/Category";
import { CategoryResolver } from ".";

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = new CategoryResolver();

test("Get all categories", async () => {
  // why ten? avoid magic numberes
  await expect(getCategories()).resolves.toHaveLength(10);
});

test("Get category", async () => {
  const categories = await getCategories();
  const firstCategory = categories[0];
  // you can destructure an array
  // const [firstCategory] = categories;
  await expect(getCategory(firstCategory.id)).resolves.toBeInstanceOf(Category);
});

test("Get error if category does not exist", async () => {
  // Same avoid magic numbers
  await expect(getCategory(10000)).rejects.toThrowError("Category not found!");
});

test("Create category", async () => {
  await expect(getCategories()).resolves.toHaveLength(10);
  const categoryCreated = await createCategory({
    name: "animal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: true,
  });
  // If you only need the id, const { id } = await crea....
  await expect(getCategory(categoryCreated.id)).resolves.toBeInstanceOf(
    Category
  );
  await expect(getCategories()).resolves.toHaveLength(11);
});

test("Get error if tries to create a category with incorrect name length", async () => {
  await expect(
    createCategory({
      // You can create const in your test that would be better, on this way you avoid several duplicated statements
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      active: false,
    })
  ).rejects.toThrowError("value too long for type character varying");
});

test("Get error if tries to create a category with duplicate name", async () => {
  await expect(
    createCategory({
      name: "animal",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      active: false,
    })
    // What do you think about having error as const?
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update category", async () => {
  const categoryUpdated = await updateCategory(1, {
    name: "automobile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    active: false,
  });
  await expect(getCategory(categoryUpdated.id)).resolves.toBeInstanceOf(
    Category
  );
  await expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "name",
    "automobile"
  );
  await expect(getCategory(categoryUpdated.id)).resolves.toHaveProperty(
    "description",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
});

test("Delete category", async () => {
  await expect(getCategories()).resolves.toHaveLength(11);
  const categories = await getCategories();
  const lastCategory = categories[categories.length - 1];
  await expect(deleteCategory(lastCategory.id)).resolves.toBeTruthy();
  await expect(getCategories()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a category inexistent", async () => {
  await expect(deleteCategory(10000)).rejects.toThrowError(
    "Category not found!"
  );
});
