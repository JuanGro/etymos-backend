import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(() => {
    createConnection().catch(err => {throw new Error(err)});
  });

  afterAll(() => {
    const testingConnection = getConnection();
    testingConnection.close().catch(err => {throw new Error(err)});
  });
}
