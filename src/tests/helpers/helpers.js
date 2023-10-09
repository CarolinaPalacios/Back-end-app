import supertest from 'supertest';
import bcrypt from 'bcrypt';

import app from '../../app';
import { User } from '../../mongo/models';

const api = supertest(app);

export const initialNotes = [
  {
    title: 'First',
    content: 'This is the first note',
    date: new Date(),
  },
  {
    title: 'Second',
    content: 'This is the second note',
    date: new Date(),
  },
  {
    title: 'Third',
    content: 'This is the third note',
    date: new Date(),
  },
];

const getPasswordHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const initialUsers = [
  {
    username: 'root',
    name: 'Root User',
    password: getPasswordHash('sekret').then((hash) => hash),
  },
  {
    username: 'testuser',
    name: 'Test User',
    password: getPasswordHash('sekret').then((hash) => hash),
  },
  {
    username: 'testuser2',
    name: 'Test User 2',
    password: getPasswordHash('sekret').then((hash) => hash),
  },
];

export const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes');
  return {
    contents: response.body.map((note) => note.content),
    response,
  };
};

export const getAllUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user) => user.toJSON());
};
