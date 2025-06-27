import express from 'express';
import {
  getUsers,
  addUser,
  getWatchedShows,
  getWatchList,
  login,
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', addUser);
userRouter.post('/login', login);
// userRouter.post('/logout', logout);
userRouter.post('/watched/:id', getWatchedShows);
userRouter.post('/watchlist/:id', getWatchList);

export default userRouter;
