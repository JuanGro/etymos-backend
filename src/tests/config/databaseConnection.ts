import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(() => {
    return createConnection().then(() => { }).catch((error) => { throw new Error(error) });
  });

  afterAll(() => {
    const testingConnection = getConnection();
    return testingConnection.close().then(() => { }).catch((error) => { throw new Error(error) });
  });
}
