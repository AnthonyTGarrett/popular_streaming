import express from 'express';
import { getUsers, addUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', addUser);

export default userRouter;
