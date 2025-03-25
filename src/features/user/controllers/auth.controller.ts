import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';

class AuthController {
  private authService = new AuthService();

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await this.authService.signup(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'User signup successfully',
      data: accessToken,
    });
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ message: 'signIn' });
  };
}

export default AuthController;
