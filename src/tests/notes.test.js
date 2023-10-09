import mongoose from 'mongoose';

import server from '../../index';
import { Note } from '../mongo/models';
import { initialNotes, api, getAllContentFromNotes } from './helpers/helpers';

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(initialNotes);

  //? parallel execution instead of insertMany
  // const noteObject = initialNotes.map(note => new Note(note));
  // const promise = noteObject.map(note => note.save());
  // await Promise.all(promise);

  //? sequential execution instead of insertMany
  // for (const note of initialNotes) {
  //   const noteObject = new Note(note);
  //   await noteObject.save();
  // }
});

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two notes', async () => {
    const { response } = await getAllContentFromNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test('the first note is correctly identified', async () => {
    const { contents } = await getAllContentFromNotes();
    expect(contents).toContain('This is the first note');
  });
});

describe('GET note by id', () => {
  test('find note by id', async () => {
    const { response } = await getAllContentFromNotes();
    const id = response.body[0].id;

    await api
      .get(`/api/notes/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('POST new notes', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      title: 'New note',
      content: 'This is a new note',
      important: true,
      userId: '651225041c9382fb187912da',
    };
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { contents, response } = await getAllContentFromNotes();
    expect(response.body).toHaveLength(initialNotes.length + 1);
    expect(contents).toContain(newNote.content);
  });

  // test('note without content and title is not added', async () => {
  //   const newNote = {
  //     important: true
  //   }
  //   await api
  //     .post('/api/notes')
  //     .send(newNote)
  //     .expect(400)

  //   const response = await api.get('/api/notes')
  //   expect(response.body).toHaveLength(initialNotes.length)
  // })
});

describe('DELETE notes', () => {
  test('a note can be deleted', async () => {
    const { response: firtsResponse } = await getAllContentFromNotes();
    const { body } = firtsResponse;
    const noteToDelete = body[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const { contents, response: secondResponse } =
      await getAllContentFromNotes();
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
    expect(contents).not.toContain(noteToDelete.content);
  });

  test('a note that not exists cannot be deleted', async () => {
    await api.delete(`/api/notes/1234`).expect(400);

    const { response } = await getAllContentFromNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });
});

describe('PUT update notes', () => {
  test('updating a note', async () => {
    const { response } = await getAllContentFromNotes();
    const id = response.body[0].id;

    await api
      .put(`/api/notes/${id}`)
      .send({
        title: 'Updated note',
        content: 'This is an updated note',
        important: true,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
