import express from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';

const userService = new UserService();
const userController = new UserController(userService);

const userRoutes = express.Router();

userRoutes.get('/', (req, res, next) => userController.getAll(req, res, next));
userRoutes.post('/create', (req, res, next) =>
  userController.createUser(req, res, next),
);

export default userRoutes;
