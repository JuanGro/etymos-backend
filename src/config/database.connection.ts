import { ApolloError } from "apollo-server";
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

beforeAll(async () => {
  try {
    await createConnection();
  } catch (error) {
    throw new ApolloError(`Error in database connection: ${error}`);
  }
});

afterAll(async () => {
  const testingConnection = getConnection();
  try {
    await testingConnection.close();
  } catch (error) {
    throw new ApolloError(`Error in database close: ${error}`);
  }
});
