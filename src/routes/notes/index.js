import { Router } from 'express';

import {
  handleGetAllNotes,
  handleGetNote,
  handleDeleteNote,
  handleUpdateNote,
  handleCreateNote,
} from '../../handlers/notesHandler/index.js';

import verifySession from '../../middlewares/verifySession.js';

const notesRouter = Router();

notesRouter.get('/', handleGetAllNotes);

notesRouter.get('/:id', handleGetNote);

notesRouter.delete('/:id', verifySession, handleDeleteNote);

notesRouter.put('/:id', verifySession, handleUpdateNote);

notesRouter.post('/', verifySession, handleCreateNote);

export default notesRouter;
