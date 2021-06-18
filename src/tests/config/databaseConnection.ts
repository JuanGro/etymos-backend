import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(() => {
    createConnection().catch(err => console.error(err));
  });

  afterAll(() => {
    const testingConnection = getConnection();
    testingConnection.close().catch(err => console.error(err));
  });
}
