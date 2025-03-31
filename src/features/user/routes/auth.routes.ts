import express, { request, response } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import { verifyUser } from '../../../globals/middlewares/verifyUser.middleware';

const authService = new AuthService();
const authController = new AuthController(authService);
const authRoutes = express.Router();

authRoutes.post('/signup', asyncWrapper(authController.signUp));
authRoutes.post('/signin', asyncWrapper(authController.signIn));
authRoutes.get('/me', verifyUser, asyncWrapper(authController.getCurrentUser));
authRoutes.post('/logout', verifyUser, asyncWrapper(authController.logOut));

export default authRoutes;
