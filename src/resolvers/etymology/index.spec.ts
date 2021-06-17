import { Etymology } from "../../models/Etymology";
import { dbConnection } from "../../tests/config/databaseConnection";
import { EtymologyResolver } from ".";

dbConnection();

const etymologyResolver = new EtymologyResolver();

test("Get all etymologies", async () => {
  expect((await etymologyResolver.getEtymologies()).length).toEqual(10);
});

test("Get etymology", async () => {
  const etymologies = await etymologyResolver.getEtymologies();
  const firstEtymology = etymologies[0];
  expect(
    await etymologyResolver.getEtymology(firstEtymology.id)
  ).toBeInstanceOf(Etymology);
});

test("Get error if etymology does not exist", async () => {
  expect(async () => {
    await etymologyResolver.getEtymology(10000);
  }).rejects.toThrowError();
});

test("Create etymology", async () => {
  expect((await etymologyResolver.getEtymologies()).length).toEqual(10);
  const etymologyCreated = await etymologyResolver.createEtymology({
    graecoLatinEtymology: "ἐτυμος",
    meaning: "etymos",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: true
  });
  expect(
    await etymologyResolver.getEtymology(etymologyCreated.id)
  ).toBeInstanceOf(Etymology);
  expect((await etymologyResolver.getEtymologies()).length).toEqual(11);
});

test("Get error if tries to create an etymology with incorrect type length", async () => {
  expect(async () => {
    await etymologyResolver.createEtymology({
      graecoLatinEtymology: "ἐτυμος",
      meaning: "etymos",
      imageUrl:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
      etymologyTypeId: 1,
      languageId: 1,
      active: true
    });
  }).rejects.toThrowError();
});

test("Update etymology", async () => {
  const etymologyUpdated = await etymologyResolver.updateEtymology(1, {
    graecoLatinEtymology: "lorem",
    meaning: "lorem",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: false
  });
  expect(
    await etymologyResolver.getEtymology(etymologyUpdated.id)
  ).toBeInstanceOf(Etymology);
  expect(
    (await etymologyResolver.getEtymology(etymologyUpdated.id)).active
  ).toBeFalsy();
  expect(
    (await etymologyResolver.getEtymology(etymologyUpdated.id)).meaning
  ).toBe("lorem");
});

test("Delete etymology", async () => {
  expect((await etymologyResolver.getEtymologies()).length).toEqual(11);
  const etymologies = await etymologyResolver.getEtymologies();
  const lastEtymology = etymologies[etymologies.length - 1];
  const etymologyDeleted = await etymologyResolver.deleteEtymology(
    lastEtymology.id
  );
  expect(etymologyDeleted).toEqual(true);
  expect((await etymologyResolver.getEtymologies()).length).toEqual(10);
});

test("Get error if tries to delete an etymology inexistent", async () => {
  expect(async () => {
    await etymologyResolver.deleteEtymology(10000);
  }).rejects.toThrowError();
});
