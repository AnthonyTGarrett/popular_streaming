import express from 'express';
import {
  getUsers,
  addUser,
  getWatched,
  getWatchList,
  login,
  addWatchedShow,
  addWatchListShow,
} from '../controllers/userController.js';
import checkToken from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', addUser);
userRouter.post('/login', login);

userRouter.get('/watched', checkToken, getWatched);
userRouter.get('/watchlist', checkToken, getWatchList);
userRouter.post('addWatched', checkToken, addWatchedShow);
userRouter.post('addWatchList', checkToken, addWatchListShow);

export default userRouter;
