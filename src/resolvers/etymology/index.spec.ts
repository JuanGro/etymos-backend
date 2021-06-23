import { Etymology } from "../../models/Etymology";
import { EtymologyResolver } from ".";
import { DUMMY_IMAGE_URL, DUMMY_TEXT2_XS, DUMMY_TEXT_S, DUMMY_TEXT_XL, DUMMY_TEXT_XS, ERROR_DUPLICATE_KEY, ERROR_MAX_LENGTH, ETYMOLOGY_NOT_FOUND, FAKER_ELEMENTS, FIRST_INDEX, INEXISTENT_INDEX } from "../../config/constants";

const {
  getEtymologies,
  getEtymology,
  createEtymology,
  updateEtymology,
  deleteEtymology,
} = new EtymologyResolver();

test("Get all etymologies", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS);
});

test("Get etymology", async () => {
  const etymologies = await getEtymologies();
  const { id } = etymologies[FIRST_INDEX];
  await expect(getEtymology(id)).resolves.toBeInstanceOf(
    Etymology
  );
});

test("Get error if etymology does not exist", async () => {
  await expect(getEtymology(INEXISTENT_INDEX)).rejects.toThrowError(
    ETYMOLOGY_NOT_FOUND
  );
});

test("Create etymology", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS);
  const { id } = await createEtymology({
    graecoLatinEtymology: DUMMY_TEXT_XS,
    meaning: DUMMY_TEXT_S,
    imageUrl:
      DUMMY_IMAGE_URL,
    etymologyTypeId: 1,
    languageId: 1,
    active: true,
  });
  await expect(getEtymology(id)).resolves.toBeInstanceOf(
    Etymology
  );
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS + 1);
});

test("Get error if tries to create an etymology with incorrect graecoLatinEtymology length", async () => {
  await expect(
    createEtymology({
      graecoLatinEtymology:
        DUMMY_TEXT_XL,
      meaning: DUMMY_TEXT_S,
      imageUrl:
        DUMMY_IMAGE_URL,
      etymologyTypeId: 1,
      languageId: 1,
      active: true,
    })
  ).rejects.toThrowError(ERROR_MAX_LENGTH);
});

test("Get error if tries to create an etymology with duplicate graecoLatinEtymology", async () => {
  await expect(
    createEtymology({
      graecoLatinEtymology: DUMMY_TEXT_XS,
      meaning: DUMMY_TEXT_S,
      imageUrl:
        DUMMY_IMAGE_URL,
      etymologyTypeId: 1,
      languageId: 1,
      active: true,
    })
  ).rejects.toThrowError(ERROR_DUPLICATE_KEY);
});

test("Update etymology", async () => {
  const { id } = await updateEtymology(1, {
    graecoLatinEtymology: DUMMY_TEXT2_XS,
    meaning: DUMMY_TEXT_S,
    imageUrl:
      DUMMY_IMAGE_URL,
    etymologyTypeId: 1,
    languageId: 1,
    active: false,
  });
  await expect(getEtymology(id)).resolves.toBeInstanceOf(
    Etymology
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    "graecoLatinEtymology",
    DUMMY_TEXT2_XS
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    "meaning",
    DUMMY_TEXT_S
  );
  await expect(getEtymology(id)).resolves.toHaveProperty(
    "imageUrl",
    DUMMY_IMAGE_URL
  );
});

test("Delete etymology", async () => {
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS + 1);
  const etymologies = await getEtymologies();
  const { id } = etymologies[etymologies.length - 1];
  await expect(deleteEtymology(id)).resolves.toEqual(true);
  await expect(getEtymologies()).resolves.toHaveLength(FAKER_ELEMENTS);
});

test("Get error if tries to delete an etymology inexistent", async () => {
  await expect(deleteEtymology(INEXISTENT_INDEX)).rejects.toThrowError(
    ETYMOLOGY_NOT_FOUND
  );
});
