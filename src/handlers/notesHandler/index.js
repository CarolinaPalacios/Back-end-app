import {
  getAllNotes,
  getNoteById,
  deleteNote,
  updateNote,
  createNote,
} from '../../controllers/notesController/index.js';
export const handleGetAllNotes = async (_req, res) => {
  try {
    const notes = await getAllNotes();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleGetNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getNoteById(id);
    note
      ? res.status(200).json(note)
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteNote(id);
    return res.status(204).send('Note deleted');
  } catch (error) {
    next(error);
  }
};

export const handleUpdateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, important } = req.body;
    const updatedData = {
      title,
      content,
      important,
    };
    const note = await updateNote(id, updatedData);
    return res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const handleCreateNote = async (req, res, next) => {
  try {
    const noteData = req.body;
    const { userId } = req;
    const newNote = await createNote(noteData, userId);
    return res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
