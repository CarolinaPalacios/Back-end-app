import bcrypt from 'bcrypt';

import { User } from '../../mongo/models/index.js';

export const getAllUsers = async () => {
  const users = await User.find().populate('notes', {
    title: 1,
    content: 1,
    date: 1,
  });
  return users;
};

export const getUser = async (id) => {
  const user = await User.findById(id).populate('notes');
  return user;
};

export const deleteUser = async (id) => {
  await User.findByIdAndRemove(id);
};

export const updateUserData = async (id, updatedData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate('notes', {
    title: 1,
    content: 1,
    date: 1,
  });
  return updatedUser;
};

export const createUser = async (userData) => {
  const { username, name, password } = userData;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  return savedUser;
};
