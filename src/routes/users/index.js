import { Router } from 'express';
import {
  handleGetAllUsers,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUserData,
  handleCreateUser,
} from '../../handlers/userHandler/index.js';

const userRouter = Router();

userRouter.get('/', handleGetAllUsers);

userRouter.get('/:id', handleGetUser);

userRouter.delete('/:id', handleDeleteUser);

userRouter.put('/:id', handleUpdateUserData);

userRouter.post('/', handleCreateUser);

export default userRouter;
