import Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import notFound from './middlewares/notFound.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

Sentry.init({
  dsn: 'https://e8a6c3bdaa6d1ebf86dda2150120bd18@o4505928244002816.ingest.sentry.io/4505928247148544',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use('/api', router);
app.use('*', notFound);

export default app;
