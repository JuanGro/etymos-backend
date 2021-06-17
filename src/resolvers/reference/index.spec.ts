import { Reference } from "../../models/Reference";
import { dbConnection } from "../../tests/config/databaseConnection";
import { ReferenceResolver } from ".";

dbConnection();

const referenceResolver = new ReferenceResolver();

test("Get all references", async () => {
  expect((await referenceResolver.getReferences()).length).toEqual(10);
});

test("Get reference", async () => {
  const references = await referenceResolver.getReferences();
  const firstReference = references[0];
  expect(
    await referenceResolver.getReference(firstReference.id)
  ).toBeInstanceOf(Reference);
});

test("Get error if reference does not exist", async () => {
  expect(async () => {
    await referenceResolver.getReference(10000);
  }).rejects.toThrowError();
});

test("Create reference", async () => {
  expect((await referenceResolver.getReferences()).length).toEqual(10);
  const referenceCreated = await referenceResolver.createReference({
    author: "Miguel de Cervantes Saavedra",
    title: "Don Quijote de la Mancha",
    publicationYear: "1990",
    publicationPlace: "Barcelona, España",
    publishingCompany: "Trillas Editorial",
    active: true
  });
  expect(
    await referenceResolver.getReference(referenceCreated.id)
  ).toBeInstanceOf(Reference);
  expect((await referenceResolver.getReferences()).length).toEqual(11);
});

test("Get error if tries to create a reference with incorrect name length", async () => {
  expect(async () => {
    await referenceResolver.createReference({
      author:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      title: "Don Quijote de la Mancha",
      publicationYear: "1990",
      publicationPlace: "Barcelona, España",
      publishingCompany: "Trillas Editorial",
      active: true
    });
  }).rejects.toThrowError();
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
  expect(
    await referenceResolver.getReference(referenceUpdated.id)
  ).toBeInstanceOf(Reference);
  expect(
    (await referenceResolver.getReference(referenceUpdated.id)).active
  ).toBeFalsy();
  expect(
    (await referenceResolver.getReference(referenceUpdated.id)).title
  ).toBe("Lorem ipsum");
});

test("Delete reference", async () => {
  expect((await referenceResolver.getReferences()).length).toEqual(11);
  const references = await referenceResolver.getReferences();
  const lastReference = references[references.length - 1];
  const referenceDeleted = await referenceResolver.deleteReference(
    lastReference.id
  );
  expect(referenceDeleted).toEqual(true);
  expect((await referenceResolver.getReferences()).length).toEqual(10);
});

test("Get error if tries to delete a reference inexistent", async () => {
  expect(async () => {
    await referenceResolver.deleteReference(10000);
  }).rejects.toThrowError();
});
