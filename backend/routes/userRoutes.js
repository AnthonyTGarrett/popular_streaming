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
userRouter.get('/shows/watched/:id', getWatchedShows);
userRouter.get('/shows/watchlist', getWatchList);

export default userRouter;
