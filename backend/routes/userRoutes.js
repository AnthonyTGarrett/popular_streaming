import express from 'express';
import {
  getUsers,
  addUser,
  getWatchedShows,
  getWatchList,
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', addUser);
// userRouter.post('/login', login);
// userRouter.post('/logout', logout);
userRouter.post('/shows/watched/', getWatchedShows);
userRouter.post('/shows/watchlist/', getWatchList);

export default userRouter;
