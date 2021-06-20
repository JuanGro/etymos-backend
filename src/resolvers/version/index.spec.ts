import { Version } from "../../models/Version";
import { VersionResolver } from ".";

const { getVersions, getVersion, createVersion, updateVersion, deleteVersion } =
  new VersionResolver();

test("Get all versions", async () => {
  await expect(getVersions()).resolves.toHaveLength(10);
});

test("Get version", async () => {
  const versions = await getVersions();
  const firstVersion = versions[0];
  await expect(getVersion(firstVersion.id)).resolves.toBeInstanceOf(Version);
});

test("Get error if version does not exist", async () => {
  await expect(getVersion(10000)).rejects.toThrowError("Version not found!");
});

test("Create version", async () => {
  await expect(getVersions()).resolves.toHaveLength(10);
  const versionCreated = await createVersion({
    version: "1.0.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: true,
  });
  await expect(getVersion(versionCreated.id)).resolves.toBeInstanceOf(Version);
  await expect(getVersions()).resolves.toHaveLength(11);
});

test("Get error if tries to create a version with incorrect version length", async () => {
  await expect(
    createVersion({
      version:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor sem et finibus ultricies.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      maintenance: true,
      active: true,
    })
  ).rejects.toThrowError("value too long for type character varying(16)");
});

test("Get error if tries to create a version with duplicate version", async () => {
  await expect(
    createVersion({
      version: "1.0.0",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      maintenance: true,
      active: true,
    })
  ).rejects.toThrowError("duplicate key value violates unique constraint");
});

test("Update version", async () => {
  const versionUpdated = await updateVersion(1, {
    version: "1.1.0",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    maintenance: false,
    active: false,
  });
  await expect(getVersion(versionUpdated.id)).resolves.toBeInstanceOf(Version);
  await expect(getVersion(versionUpdated.id)).resolves.toHaveProperty(
    "active",
    false
  );
  await expect(getVersion(versionUpdated.id)).resolves.toHaveProperty(
    "maintenance",
    false
  );
  await expect(getVersion(versionUpdated.id)).resolves.toHaveProperty(
    "version",
    "1.1.0"
  );
  await expect(getVersion(versionUpdated.id)).resolves.toHaveProperty(
    "description",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
});

test("Delete version", async () => {
  await expect(getVersions()).resolves.toHaveLength(11);
  const versions = await getVersions();
  const lastVersion = versions[versions.length - 1];
  await expect(deleteVersion(lastVersion.id)).resolves.toEqual(true);
  await expect(getVersions()).resolves.toHaveLength(10);
});

test("Get error if tries to delete a version inexistent", async () => {
  await expect(deleteVersion(10000)).rejects.toThrowError("Version not found!");
});
