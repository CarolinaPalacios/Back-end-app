import jwt from 'jsonwebtoken';

import { SECRET } from '../utils/env.js';

const verifySession = (req, res, next) => {
  const authorization = req.get('authorization');

  let token = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, SECRET);

  if (!(authorization || decodedToken.id)) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};

export default verifySession;
