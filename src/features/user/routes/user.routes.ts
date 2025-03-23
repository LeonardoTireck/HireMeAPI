import express from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';

const userService = new UserService();
const userController = new UserController(userService);

const userRoutes = express.Router();

userRoutes.get('/', asyncWrapper(userController.getAll));
userRoutes.post('/create', asyncWrapper(userController.createUser));

export default userRoutes;
