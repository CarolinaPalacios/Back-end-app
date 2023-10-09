import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';

import { SECRET } from '../../utils/env.js';
import { User } from '../../mongo/models/index.js';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '7d' });

  return res.status(200).json({
    name: user.name,
    username: user.username,
    token,
  });
});

export default loginRouter;
