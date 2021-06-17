import { Reference } from "../../models/Reference";
import { dbConnection } from "../../tests/config/databaseConnection";
import { ReferenceResolver } from ".";

dbConnection();

const { getReferences, getReference, createReference, updateReference, deleteReference } = new ReferenceResolver();

test("Get all references", () => {
  expect(getReferences()).resolves.toHaveLength(10);
});

test("Get reference", async () => {
  const references = await getReferences();
  const firstReference = references[0];
  expect(getReference(firstReference.id)).resolves.toBeInstanceOf(Reference);
});

test("Get error if reference does not exist", () => {
  expect(getReference(10000)).rejects.toThrowError();
});

test("Create reference", async () => {
  expect(getReferences()).resolves.toHaveLength(10);
  const referenceCreated = await createReference({
    author: "Miguel de Cervantes Saavedra",
    title: "Don Quijote de la Mancha",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: true
  });
  expect(getReference(referenceCreated.id)).resolves.toBeInstanceOf(Reference);
  expect(getReferences()).resolves.toHaveLength(11);
});

test("Get error if tries to create a reference with incorrect name length", () => {
  expect(createReference({
      author:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      title: "Don Quijote de la Mancha",
      publicationYear: "1990",
      publicationPlace: "Barcelona, España",
      publishingCompany: "Trillas Editorial",
      active: true
    })).rejects.toThrowError();
});

test("Update reference", async () => {
  const referenceUpdated = await updateReference(1, {
    author: "Miguel de Cervantes Saavedra",
    title: "Lorem ipsum",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: false
  });
  expect(getReference(referenceUpdated.id)).resolves.toBeInstanceOf(Reference);
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("active", false);
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("title", "Lorem ipsum");
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("author", "Miguel de Cervantes Saavedra");
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("publicationYear", "1990");
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("publicationPlace", "Barcelona, España");
  expect(getReference(referenceUpdated.id)).resolves.toHaveProperty("publishingCompany", "Trillas Editorial");
});

test("Delete reference", async () => {
  expect(getReferences()).resolves.toHaveLength(11);
  const references = await getReferences();
  const lastReference = references[references.length - 1];
  expect(deleteReference(lastReference.id)).resolves.toEqual(true);
  expect(getReferences()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a reference inexistent", () => {
  expect(deleteReference(10000)).rejects.toThrowError();
});
