import { ApolloError } from 'apollo-server';
// Import conventions, this could be the first line
import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

beforeAll(async () => {
  try {
    await createConnection();
  } catch (error) {
    throw new ApolloError('Error in database connection');
  }
});

afterAll(async () => {
  const testingConnection = getConnection();
  try {
    await testingConnection.close();
  } catch (error) {
    throw new ApolloError('Error in database close');
  }
});
