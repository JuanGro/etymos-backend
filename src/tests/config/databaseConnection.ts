import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(() => {
    return new Promise<void>(resolve => {
      createConnection();
      resolve();
    });
  });

  afterAll(() => {
    return new Promise<void>(resolve => {
      const testingConnection = getConnection();
      testingConnection.close();
      resolve();
    });
  });
}
