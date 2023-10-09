import mongoose from 'mongoose';

import server from '../../index';
import { api, initialUsers, getAllUsers } from './helpers/helpers';
import { User } from '../mongo/models';

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

describe('POST new user', () => {
  test('works as expected creating a fresh user', async () => {
    const initialDBUsers = await getAllUsers();
    const newUser = {
      username: 'nombre',
      name: 'Nombre',
      password: 'sekret',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getAllUsers();
    expect(usersAtEnd).toHaveLength(initialDBUsers.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('cannot create a user without username, name or password', async () => {
    const initialDBUsers = await getAllUsers();

    const newUser = {
      name: 'Nombre',
      password: 'sekret',
    };
    await api.post('/api/users').send(newUser).expect(400);

    const usersAtEnd = await getAllUsers();
    expect(usersAtEnd).toHaveLength(initialDBUsers.length);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test('cannot create a user with taken username', async () => {
    const initialDBUsers = await getAllUsers();

    const newUser = {
      username: 'root',
      name: 'Name Name',
      password: 'sekret',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(406)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await getAllUsers();
    expect(usersAtEnd).toHaveLength(initialDBUsers.length);
  });
});

describe('GET all users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there is at least one user', async () => {
    const initialDBUsers = await getAllUsers();
    expect(initialDBUsers).toHaveLength(initialUsers.length);
  });

  test('the first user is correctly identified', async () => {
    const initialDBUsers = await getAllUsers();
    expect(initialDBUsers[0].username).toBe(initialUsers[0].username);
  });
});

describe('GET user by id', () => {
  test('find user by id', async () => {
    const initialDBUsers = await getAllUsers();
    const id = initialDBUsers[0].id;

    await api
      .get(`/api/users/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
