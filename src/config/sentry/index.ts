/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/node';
import { ApolloError } from 'apollo-server';

function addFailingOperation(scope: any, ctx: any) {
  // Annotate whether failing operation was query/mutation/subscription
  if (ctx.operation) {
    scope.setTag('kind', ctx.operation.operation);
  }
}

function addQuery(scope: any, ctx: any) {
  // Log query and variables as extras (make sure to strip out sensitive data!)
  scope.setExtra('query', ctx.request.query);
}

function addVariables(scope: any, ctx: any) {
  // Log query and variables as extras (make sure to strip out sensitive data!)
  scope.setExtra('variables', ctx.request.variables);
}

function addPath(scope: any, err: any, sentry: any) {
  if (err.path) {
    // We can also add the path as breadcrumb
    scope.addBreadcrumb({
      category: 'query-path',
      message: err.path.join(' > '),
      level: sentry.Severity.Debug,
    });
  }
}

function setRequest(scope: any, ctx: any) {
  if (ctx.request.http) {
    const transactionId = ctx.request.http.headers.get('x-transaction-id');
    if (transactionId) {
      scope.setTransaction(transactionId);
    }
  }
}

function addReportDetails(err: any, ctx: any) {
  // Add scoped report details and send to Sentry
  Sentry.withScope((scope) => {
    addFailingOperation(scope, ctx);
    addQuery(scope, ctx);
    addVariables(scope, ctx);
    addPath(scope, err, Sentry);
    setRequest(scope, ctx);
    Sentry.captureException(err);
  });
}

export const sentryConfiguration = {
  requestDidStart(_: any) {
    /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
    return {
      didEncounterErrors(ctx: any) {
        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing
          if (err instanceof ApolloError) {
            continue;
          }

          addReportDetails(err, ctx);
        }
      },
    };
  },
};
