import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(async () => {
    try {
      await createConnection();
    } catch (error) {
      throw new Error(error);
    }
  });

  afterAll(async () => {
    try {
      const testingConnection = getConnection();
      await testingConnection.close();
    } catch (error) {
      throw new Error(error);
    }
  });
}
