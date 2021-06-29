import { ApolloError } from 'apollo-server';
import { createConnection, getConnection } from 'typeorm';

import 'reflect-metadata';

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
