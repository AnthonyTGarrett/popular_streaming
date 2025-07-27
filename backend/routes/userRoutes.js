import express from 'express';
import {
  getUsers,
  addUser,
  getWatched,
  getWatchList,
  login,
  addWatchedShow,
  addWatchListShow,
  delWatchListShow,
  delWatchedShow,
  clearWatched,
  clearWatchList,
} from '../controllers/userController.js';
import checkToken from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', addUser);
userRouter.post('/login', login);

userRouter.post('/watched', checkToken, getWatched);
userRouter.get('/watchList', checkToken, getWatchList);

userRouter.post('/addWatchedShow', checkToken, addWatchedShow);
userRouter.post('/addWatchListShow', checkToken, addWatchListShow);

userRouter.delete('/delWatchedShow', checkToken, delWatchedShow);
userRouter.delete('/delWatchListShow', checkToken, delWatchListShow);

userRouter.delete('/clearWatched', checkToken, clearWatched);
userRouter.delete('/clearWatchList', checkToken, clearWatchList);

export default userRouter;
