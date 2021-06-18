import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export async function dbConnection() {
  beforeAll(async () => {
    try {
      await createConnection();
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    try {
      const testingConnection = getConnection();
      await testingConnection.close();
    } catch (error) {
      console.error(error);
    }
  });
}
