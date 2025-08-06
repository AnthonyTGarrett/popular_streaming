import express from 'express';
import {
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

// Route for testing only
// userRouter.get('/', getUsers);

// Register the user with the given user information in the body
userRouter.post('/register', addUser);

// Login the user and return a jwt token if successful with the provided username and password
userRouter.post('/login', login);

// Return the watched show list if the given token is verified by the middleware
userRouter.post('/watched', checkToken, getWatched);
// Return the watch list if the given token is verified by the middleware
userRouter.post('/watchList', checkToken, getWatchList);

// Add show to the ShowsWatched table of the given user if verified by the middleware
userRouter.post('/addWatchedShow', checkToken, addWatchedShow);
// Add show to the ShowsToWatch table of the given user if verified by the middleware
userRouter.post('/addWatchListShow', checkToken, addWatchListShow);

// Delete the given show from the ShowsWatched table if verified by the middleware
userRouter.delete('/delWatchedShow', checkToken, delWatchedShow);
// Delete the given show from the ShowsToWatch table if verified by the middleware
userRouter.delete('/delWatchListShow', checkToken, delWatchListShow);

// Clear the given users ShowsWatched table if verified by the middleware
userRouter.delete('/clearWatched', checkToken, clearWatched);
// Clear the given users ShowsToWatch table if verified by the middleware
userRouter.delete('/clearWatchList', checkToken, clearWatchList);

export default userRouter;
