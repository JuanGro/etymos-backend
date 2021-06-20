import { Etymology } from "../../models/Etymology";
import { EtymologyResolver } from ".";

const {
  getEtymologies,
  getEtymology,
  createEtymology,
  updateEtymology,
  deleteEtymology,
} = new EtymologyResolver();

test("Get all etymologies", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(10);
});

test("Get etymology", async () => {
  const etymologies = await getEtymologies();
  const firstEtymology = etymologies[0];
  await expect(getEtymology(firstEtymology.id)).resolves.toBeInstanceOf(Etymology);
});

test("Get error if etymology does not exist", async () => {
  await expect(getEtymology(10000)).rejects.toThrowError();
});

test("Create etymology", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(10);
  const etymologyCreated = await createEtymology({
    graecoLatinEtymology: "ἐτυμος",
    meaning: "etymos",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: true,
  });
  await expect(getEtymology(etymologyCreated.id)).resolves.toBeInstanceOf(Etymology);
  await expect(getEtymologies()).resolves.toHaveLength(11);
});

test("Get error if tries to create an etymology with incorrect type length", async () => {
  await expect(
    createEtymology({
      graecoLatinEtymology: "ἐτυμος",
      meaning: "etymos",
      imageUrl:
        "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
      etymologyTypeId: 1,
      languageId: 1,
      active: true,
    })
  ).rejects.toThrowError();
});

test("Update etymology", async () => {
  const etymologyUpdated = await updateEtymology(1, {
    graecoLatinEtymology: "lorem",
    meaning: "lorem",
    imageUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg",
    etymologyTypeId: 1,
    languageId: 1,
    active: false,
  });
  await expect(getEtymology(etymologyUpdated.id)).resolves.toBeInstanceOf(Etymology);
  await expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty(
    "graecoLatinEtymology",
    "lorem"
  );
  await expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty(
    "meaning",
    "lorem"
  );
  await expect(getEtymology(etymologyUpdated.id)).resolves.toHaveProperty(
    "imageUrl",
    "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/d2/88/6d/d2886d3d-f03c-d0fa-1277-540ee369a194/source/512x512bb.jpg"
  );
});

test("Delete etymology", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(11);
  const etymologies = await getEtymologies();
  const lastEtymology = etymologies[etymologies.length - 1];
  await expect(deleteEtymology(lastEtymology.id)).resolves.toEqual(true);
  await expect(getEtymologies()).resolves.toHaveLength(10);
});

test("Get error if tries to delete an etymology inexistent", async () => {
  await expect(deleteEtymology(10000)).rejects.toThrowError();
});
