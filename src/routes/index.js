import Sentry from '@sentry/node';
import { Router } from 'express';

import handleErrors from '../middlewares/handleErrors.js';

import notesRouter from './notes/index.js';
import userRouter from './users/index.js';
import loginRouter from './login/index.js';

const router = Router();

router.use('/notes', notesRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

// The error handler must be registered before any other error middleware and after all controllers
router.use(Sentry.Handlers.errorHandler());
router.use(handleErrors);

export default router;
