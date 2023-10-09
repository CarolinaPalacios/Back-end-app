import { Note, User } from '../../mongo/models/index.js';
export const getAllNotes = async () => {
  const notes = await Note.find().populate('user', { username: 1, name: 1 });
  return notes;
};

export const getNoteById = async (id) => {
  const note = await Note.findById(id).populate('user', {
    username: 1,
    name: 1,
  });
  return note;
};

export const deleteNote = async (id) => {
  await Note.findByIdAndRemove(id);
};

export const updateNote = async (id, updatedData) => {
  // al metodo findByIdAndUpdate se le puede pasar por 3er parametro un objeto para que devuelva el update, si no por defaul devuelve el anterior en la respuesta
  const updatedNote = await Note.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate('user', { username: 1, name: 1 });
  return updatedNote;
};

export const createNote = async (noteData, userId) => {
  const { title, content, important = false } = noteData;

  const user = await User.findById(userId);

  const newNote = new Note({
    title,
    content,
    date: new Date(),
    important,
    user: user._id,
  });

  await (await newNote.save()).populate('user', { username: 1, name: 1 });

  user.notes = [...user.notes, newNote._id];

  await user.save();

  return newNote;
};
