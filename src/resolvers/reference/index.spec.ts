import { Reference } from "../../models/Reference";
import { ReferenceResolver } from ".";

const {
  getReferences,
  getReference,
  createReference,
  updateReference,
  deleteReference,
} = new ReferenceResolver();

test("Get all references", async () => {
  await expect(getReferences()).resolves.toHaveLength(10);
});

test("Get reference", async () => {
  const references = await getReferences();
  const firstReference = references[0];
  await expect(getReference(firstReference.id)).resolves.toBeInstanceOf(Reference);
});

test("Get error if reference does not exist", async () => {
  await expect(getReference(10000)).rejects.toThrowError("Reference not found!");
});

test("Create reference", async () => {
  await expect(getReferences()).resolves.toHaveLength(10);
  const referenceCreated = await createReference({
    author: "Miguel de Cervantes Saavedra",
    title: "Don Quijote de la Mancha",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: true,
  });
  await expect(getReference(referenceCreated.id)).resolves.toBeInstanceOf(Reference);
  await expect(getReferences()).resolves.toHaveLength(11);
});

test("Get error if tries to create a reference with incorrect author length", async () => {
  await expect(
    createReference({
      author: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      title: "Lorem",
      publicationYear: "1990",
      publicationPlace: "Barcelona, España",
      publishingCompany: "Trillas Editorial",
      active: true,
    })
  ).rejects.toThrowError("value too long for type character varying");
});

test("Get error if tries to create a reference with duplicate title", async () => {
  await expect(
    createReference({
      author: "Miguel de Cervantes Saavedra",
      title: "Don Quijote de la Mancha",
      publicationYear: "1990",
      publicationPlace: "Barcelona, España",
      publishingCompany: "Trillas Editorial",
      active: true,
    })
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update reference", async () => {
  const referenceUpdated = await updateReference(1, {
    author: "Miguel de Cervantes Saavedra",
    title: "Lorem ipsum",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: false,
  });
  await expect(getReference(referenceUpdated.id)).resolves.toBeInstanceOf(Reference);
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "title",
    "Lorem ipsum"
  );
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "author",
    "Miguel de Cervantes Saavedra"
  );
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "publicationYear",
    "1990"
  );
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "publicationPlace",
    "Barcelona, España"
  );
  await expect(getReference(referenceUpdated.id)).resolves.toHaveProperty(
    "publishingCompany",
    "Trillas Editorial"
  );
});

test("Delete reference", async () => {
  await expect(getReferences()).resolves.toHaveLength(11);
  const references = await getReferences();
  const lastReference = references[references.length - 1];
  await expect(deleteReference(lastReference.id)).resolves.toEqual(true);
  await expect(getReferences()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a reference inexistent", async () => {
  await expect(deleteReference(10000)).rejects.toThrowError("Reference not found!");
});
