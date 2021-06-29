/* eslint-disable camelcase */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import * as Sentry from '@sentry/node';
import Schema from './schema';
import { sentryConfiguration } from './config/sentry';

async function main() {
  await createConnection();
  const schema = await Schema();
  const server = new ApolloServer({
    schema,
    plugins: [sentryConfiguration],
  });
  const {
    NODE_ENV,
    NODE_PORT,
    PRODUCTION_ENV,
    SENTRY_DSN,
    APP_NAME,
    VERSION,
  } = process.env;

  if (NODE_ENV === PRODUCTION_ENV) {
    // Configure Sentry
    Sentry.init({
      dsn: SENTRY_DSN,
      release: `${APP_NAME}@${VERSION}`,
      environment: NODE_ENV,
    });
  }

  await server.listen(NODE_PORT);

  // eslint-disable-next-line no-console
  console.log(`Server has started in port ${NODE_PORT}`);
}

main();
