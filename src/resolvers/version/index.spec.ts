import { Version } from "../../models/Version";
import { dbConnection } from "../../tests/config/databaseConnection";
import { VersionResolver } from ".";

dbConnection();

const versionResolver = new VersionResolver();

test("Get all versions", async () => {
  expect((await versionResolver.getVersions()).length).toEqual(10);
});

test("Get version", async () => {
  const versions = await versionResolver.getVersions();
  const firstVersion = versions[0];
  expect(await versionResolver.getVersion(firstVersion.id)).toBeInstanceOf(
    Version
  );
});

test("Get error if version does not exist", async () => {
  expect(async () => {
    await versionResolver.getVersion(10000);
  }).rejects.toThrowError();
});

test("Create version", async () => {
  expect((await versionResolver.getVersions()).length).toEqual(10);
  const versionCreated = await versionResolver.createVersion({
    version: "1.0.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: true
  });
  expect(await versionResolver.getVersion(versionCreated.id)).toBeInstanceOf(
    Version
  );
  expect((await versionResolver.getVersions()).length).toEqual(11);
});

test("Get error if tries to create a version with incorrect name length", async () => {
  expect(async () => {
    await versionResolver.createVersion({
      version:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      maintenance: true,
      active: true
    });
  }).rejects.toThrowError();
});

test("Update version", async () => {
  const versionUpdated = await versionResolver.updateVersion(1, {
    version: "1.1.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: false
  });
  expect(await versionResolver.getVersion(versionUpdated.id)).toBeInstanceOf(
    Version
  );
  expect((await versionResolver.getVersion(versionUpdated.id)).active).toBeFalsy();
  expect((await versionResolver.getVersion(versionUpdated.id)).version).toBe(
    "1.1.0"
  );
});

test("Delete version", async () => {
  expect((await versionResolver.getVersions()).length).toEqual(11);
  const versions = await versionResolver.getVersions();
  const lastVersion = versions[versions.length - 1];
  const versionDeleted = await versionResolver.deleteVersion(lastVersion.id);
  expect(versionDeleted).toEqual(true);
  expect((await versionResolver.getVersions()).length).toEqual(10);
});

test("Get error if tries to delete a version inexistent", async () => {
  expect(async () => {
    await versionResolver.deleteVersion(10000);
  }).rejects.toThrowError();
});
