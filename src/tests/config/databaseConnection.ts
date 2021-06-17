import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export async function dbConnection() {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const testingConnection = getConnection();
    await testingConnection.close();
  });
}
