import { Version } from "../../models/Version";
import { dbConnection } from "../../tests/config/databaseConnection";
import { VersionResolver } from ".";

dbConnection();

const { getVersions, getVersion, createVersion, updateVersion, deleteVersion } = new VersionResolver();

test("Get all versions", () => {
  expect(getVersions()).resolves.toHaveLength(10);
});

test("Get version", async () => {
  const versions = await getVersions();
  const firstVersion = versions[0];
  expect(getVersion(firstVersion.id)).resolves.toBeInstanceOf(Version);
});

test("Get error if version does not exist", () => {
  expect(getVersion(10000)).rejects.toThrowError();
});

test("Create version", async () => {
  expect(getVersions()).resolves.toHaveLength(10);
  const versionCreated = await createVersion({
    version: "1.0.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: true
  });
  expect(getVersion(versionCreated.id)).resolves.toBeInstanceOf(Version);
  expect(getVersions()).resolves.toHaveLength(11);
});

test("Get error if tries to create a version with incorrect name length", () => {
  expect(createVersion({
      version:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      maintenance: true,
      active: true
    })).rejects.toThrowError();
});

test("Update version", async () => {
  const versionUpdated = await updateVersion(1, {
    version: "1.1.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: false
  });
  expect(getVersion(versionUpdated.id)).resolves.toBeInstanceOf(Version);
  expect(getVersion(versionUpdated.id)).resolves.toHaveProperty("active", false);
  expect(getVersion(versionUpdated.id)).resolves.toHaveProperty("maintenance", false);
  expect(getVersion(versionUpdated.id)).resolves.toHaveProperty("version", "1.1.0");
  expect(getVersion(versionUpdated.id)).resolves.toHaveProperty("description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
});

test("Delete version", async () => {
  expect(getVersions()).resolves.toHaveLength(11);
  const versions = await getVersions();
  const lastVersion = versions[versions.length - 1];
  expect(deleteVersion(lastVersion.id)).resolves.toEqual(true);
  expect(getVersions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a version inexistent", () => {
  expect(deleteVersion(10000)).rejects.toThrowError();
});
