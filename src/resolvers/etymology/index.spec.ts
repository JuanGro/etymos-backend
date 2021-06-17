import { Etymology } from "../../models/Etymology";
import { dbConnection } from "../../tests/config/databaseConnection";
import { EtymologyResolver } from ".";

dbConnection();

const { getEtymologies, getEtymology, createEtymology, updateEtymology, deleteEtymology } = new EtymologyResolver();

test("Get all etymologies", () => {
  expect(getEtymologies()).resolves.toHaveLength(10);
});

test("Get etymology", async () => {
  const etymologies = await getEtymologies();
  const firstEtymology = etymologies[0];
  expect(getEtymology(firstEtymology.id)).resolves.toBeInstanceOf(Etymology);
});

test("Get error if etymology does not exist", () => {
  expect(getEtymology(10000)).rejects.toThrowError();
});

test("Create etymology", async () => {
  expect(getEtymologies()).resolves.toHaveLength(10);
  const etymologyCreated = await createEtymology({
    graecoLatinEtymology: "ἐτυμος",
    meaning: "etymos",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: true
  });
  expect(getEtymology(etymologyCreated.id)).resolves.toBeInstanceOf(Etymology);
  expect(getEtymologies()).resolves.toHaveLength(11);
});

test("Get error if tries to create an etymology with incorrect type length", () => {
  expect(createEtymology({
      graecoLatinEtymology: "ἐτυμος",
      meaning: "etymos",
      imageUrl:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
      etymologyTypeId: 1,
      languageId: 1,
      active: true
    })).rejects.toThrowError();
});

test("Update etymology", async () => {
  const etymologyUpdated = await updateEtymology(1, {
    graecoLatinEtymology: "lorem",
    meaning: "lorem",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: false
  });
  expect(getEtymology(etymologyUpdated.id)).resolves.toBeInstanceOf(Etymology);
  expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty("active", false);
  expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty("graecoLatinEtymology", "lorem");
  expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty("meaning", "lorem");
  expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty("imageUrl", "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg");
});

test("Delete etymology", async () => {
  expect(getEtymologies()).resolves.toHaveLength(11);
  const etymologies = await getEtymologies();
  const lastEtymology = etymologies[etymologies.length - 1];
  expect(deleteEtymology(lastEtymology.id)).resolves.toEqual(true);
  expect(getEtymologies()).resolves.toHaveLength(10);
});

test("Get error if tries to delete an etymology inexistent", () => {
  expect(deleteEtymology(10000)).rejects.toThrowError();
});
