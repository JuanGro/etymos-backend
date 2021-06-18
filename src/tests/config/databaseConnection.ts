import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(async () => {
    await createConnection().catch(err => {throw new Error(err)});
  });

  afterAll(async () => {
    const testingConnection = getConnection();
    await testingConnection.close().catch(err => {throw new Error(err)});
  });
}
