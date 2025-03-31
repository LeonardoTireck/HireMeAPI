import express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';

const authService = new AuthService();
const authController = new AuthController(authService);
const authRoutes = express.Router();

authRoutes.post('/signup', asyncWrapper(authController.signUp));
authRoutes.post('/signin', asyncWrapper(authController.signIn));

export default authRoutes;
