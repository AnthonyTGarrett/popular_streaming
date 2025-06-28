import express from 'express';
import {
  getUsers,
  addUser,
  getWatchedShows,
  getWatchList,
  login,
} from '../controllers/userController.js';
import { checkToken } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', addUser);
userRouter.post('/login', login);
userRouter.get('/watched/:id', checkToken, getWatchedShows);
userRouter.get('/watchlist/:id', checkToken, getWatchList);

export default userRouter;
