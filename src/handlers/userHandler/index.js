import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUserData,
  createUser,
} from '../../controllers/userController/index.js';

export const handleGetAllUsers = async (_req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleGetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    return res.status(204).send('User deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleUpdateUserData = async (req, res) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const updatedData = {
    username,
    name,
  };
  try {
    const user = await updateUserData(id, updatedData);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleCreateUser = async (req, res) => {
  const { username, name, password } = req.body;
  const userData = {
    username,
    name,
    password,
  };
  try {
    const newUser = await createUser(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(406).json({ error: error.errors.username.message });
  }
};
