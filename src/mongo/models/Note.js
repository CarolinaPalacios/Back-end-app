import { model } from 'mongoose';

import { noteSchema } from '../schemas/index.js';

const Note = model('Note', noteSchema);

export default Note;

// Note.find({}).then((notes) => {
//   console.log(notes)
//   mongoose.connection.close()
// }).catch((err) => {
//   console.log(err)
// })

// const note = new Note({
//   title: 'My title',
//   content: 'My content',
//   date: new Date(),
//   important: true
// })

// note.save().then((result) => {
//   console.log(result)
//   mongoose.connection.close()
// }).catch((err) => {
//   console.log(err)
// })
