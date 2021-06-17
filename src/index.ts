import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloError, ApolloServer } from "apollo-server";
import * as Sentry from "@sentry/node";
import Schema from "./schema";

const {
  NODE_ENV,
  NODE_PORT,
  PRODUCTION_ENV,
  SENTRY_DSN,
  npm_package_name,
  npm_package_version
} = process.env;

async function main() {
  await createConnection();
  const schema = await Schema();
  const server = new ApolloServer({
    schema,
    plugins: [
      {
        requestDidStart(_) {
          /* Within this returned object, define functions that respond
               to request-specific lifecycle events. */
          return {
            didEncounterErrors(ctx) {
              for (const err of ctx.errors) {
                // Only report internal server errors,
                // all errors extending ApolloError should be user-facing
                if (err instanceof ApolloError) {
                  continue;
                }

                // Add scoped report details and send to Sentry
                Sentry.withScope((scope) => {
                  // Annotate whether failing operation was query/mutation/subscription
                  if (ctx.operation) {
                    scope.setTag("kind", ctx.operation.operation);
                  }1.0

                  // Log query and variables as extras (make sure to strip out sensitive data!)
                  scope.setExtra("query", ctx.request.query);
                  scope.setExtra("variables", ctx.request.variables);

                  if (err.path) {
                    // We can also add the path as breadcrumb
                    scope.addBreadcrumb({
                      category: "query-path",
                      message: err.path.join(" > "),
                      level: Sentry.Severity.Debug,
                    });
                  }

                  if (ctx.request.http) {
                    const transactionId = ctx.request.http.headers.get(
                      "x-transaction-id"
                    );
                    if (transactionId) {
                      scope.setTransaction(transactionId);
                    }
                  }

                  Sentry.captureException(err);
                });
              }
            },
          };
        },
      },
    ],
  });

  if (NODE_ENV === PRODUCTION_ENV) {
    // Configure Sentry
    Sentry.init({
      dsn: SENTRY_DSN,
      release:
        npm_package_name + "@" + npm_package_version,
      environment: NODE_ENV
    });
  }

  await server.listen(NODE_PORT);

  // tslint:disable-next-line: no-console
  console.log("Server has started!");
}

main();
