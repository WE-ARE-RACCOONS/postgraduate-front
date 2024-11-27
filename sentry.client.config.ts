// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://2b4c568590e032befce183f3161e2546@o4508325074763776.ingest.us.sentry.io/4508325154324480',

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
