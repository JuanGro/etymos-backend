import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

beforeAll(async () => {
  try {
    await createConnection();
  } catch (error) {
    throw new Error(error);
  }
});

afterAll(async () => {
  const testingConnection = getConnection();
  try {
    await testingConnection.close();
  } catch (error) {
    throw new Error(error);
  }
});
