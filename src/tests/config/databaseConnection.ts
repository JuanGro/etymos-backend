import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

export function dbConnection() {
  beforeAll(async (done) => {
    await createConnection().catch(err => {throw new Error(err)});
    done();
  });

  afterAll(async (done) => {
    const testingConnection = getConnection();
    await testingConnection.close().catch(err => {throw new Error(err)});
    done();
  });
}
