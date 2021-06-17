import { Reference } from "../../models/Reference";
import { dbConnection } from "../../tests/config/databaseConnection";
import { ReferenceResolver } from ".";

dbConnection();

const referenceResolver = new ReferenceResolver();

test("Get all references", () => {
  expect(referenceResolver.getReferences()).resolves.toHaveLength(10);
});

test("Get reference", async () => {
  const references = await referenceResolver.getReferences();
  const firstReference = references[0];
  expect(referenceResolver.getReference(firstReference.id)).resolves.toBeInstanceOf(Reference);
});

test("Get error if reference does not exist", () => {
  expect(referenceResolver.getReference(10000)).rejects.toThrowError();
});

test("Create reference", async () => {
  expect(referenceResolver.getReferences()).resolves.toHaveLength(10);
  const referenceCreated = await referenceResolver.createReference({
    author: "Miguel de Cervantes Saavedra",
    title: "Don Quijote de la Mancha",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: true
  });
  expect(referenceResolver.getReference(referenceCreated.id)).resolves.toBeInstanceOf(Reference);
  expect(referenceResolver.getReferences()).resolves.toHaveLength(11);
});

test("Get error if tries to create a reference with incorrect name length", () => {
  expect(referenceResolver.createReference({
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
  const referenceUpdated = await referenceResolver.updateReference(1, {
    author: "Miguel de Cervantes Saavedra",
    title: "Lorem ipsum",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: false
  });
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toBeInstanceOf(Reference);
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("active", false);
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("title", "Lorem ipsum");
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("author", "Miguel de Cervantes Saavedra");
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("publicationYear", "1990");
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("publicationPlace", "Barcelona, España");
  expect(referenceResolver.getReference(referenceUpdated.id)).resolves.toHaveProperty("publishingCompany", "Trillas Editorial");
});

test("Delete reference", async () => {
  expect(referenceResolver.getReferences()).resolves.toHaveLength(11);
  const references = await referenceResolver.getReferences();
  const lastReference = references[references.length - 1];
  expect(referenceResolver.deleteReference(lastReference.id)).resolves.toEqual(true);
  expect(referenceResolver.getReferences()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a reference inexistent", () => {
  expect(referenceResolver.deleteReference(10000)).rejects.toThrowError();
});
