import { Version } from "../../models/Version";
import { dbConnection } from "../../tests/config/databaseConnection";
import { VersionResolver } from ".";

dbConnection();

const versionResolver = new VersionResolver();

test("Get all versions", () => {
  expect(versionResolver.getVersions()).resolves.toHaveLength(10);
});

test("Get version", async () => {
  const versions = await versionResolver.getVersions();
  const firstVersion = versions[0];
  expect(versionResolver.getVersion(firstVersion.id)).resolves.toBeInstanceOf(Version);
});

test("Get error if version does not exist", () => {
  expect(versionResolver.getVersion(10000)).rejects.toThrowError();
});

test("Create version", async () => {
  expect(versionResolver.getVersions()).resolves.toHaveLength(10);
  const versionCreated = await versionResolver.createVersion({
    version: "1.0.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: true
  });
  expect(versionResolver.getVersion(versionCreated.id)).resolves.toBeInstanceOf(Version);
  expect(versionResolver.getVersions()).resolves.toHaveLength(11);
});

test("Get error if tries to create a version with incorrect name length", () => {
  expect(versionResolver.createVersion({
      version:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      maintenance: true,
      active: true
    })).rejects.toThrowError();
});

test("Update version", async () => {
  const versionUpdated = await versionResolver.updateVersion(1, {
    version: "1.1.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: false
  });
  expect(versionResolver.getVersion(versionUpdated.id)).resolves.toBeInstanceOf(Version);
  expect(versionResolver.getVersion(versionUpdated.id)).resolves.toHaveProperty("active", false);
  expect(versionResolver.getVersion(versionUpdated.id)).resolves.toHaveProperty("maintenance", false);
  expect(versionResolver.getVersion(versionUpdated.id)).resolves.toHaveProperty("version", "1.1.0");
  expect(versionResolver.getVersion(versionUpdated.id)).resolves.toHaveProperty("description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
});

test("Delete version", async () => {
  expect(versionResolver.getVersions()).resolves.toHaveLength(11);
  const versions = await versionResolver.getVersions();
  const lastVersion = versions[versions.length - 1];
  expect(versionResolver.deleteVersion(lastVersion.id)).resolves.toEqual(true);
  expect(versionResolver.getVersions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a version inexistent", () => {
  expect(versionResolver.deleteVersion(10000)).rejects.toThrowError();
});
