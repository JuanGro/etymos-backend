import { ApolloError } from "apollo-server";
// Import conventions, this could be the first line
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";

beforeAll(async () => {
  try {
    await createConnection();
  } catch (error) {
    // Error in database... you could have a function in this file that generates the error message and avoid duplicated statements
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
