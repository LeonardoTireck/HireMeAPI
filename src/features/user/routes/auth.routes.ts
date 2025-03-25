import express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';

const authService = new AuthService();
const authController = new AuthController(authService);
const authRoutes = express.Router();

authRoutes.post('/signup', authController.signUp);
authRoutes.post('/signin', authController.signIn);

export default authRoutes;
