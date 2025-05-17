import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';
import { sendTokenToCookie } from '../../../globals/helpers/cookie.helper';
import { BadRequestException } from '../../../globals/cores/error.core';
class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await this.authService.signup(req.body);
    sendTokenToCookie(accessToken, res);
    res.status(StatusCodes.CREATED).json({
      message: 'User signup successfully',
    });
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await this.authService.signIn(req.body);
    sendTokenToCookie(accessToken, res);
    res.status(StatusCodes.OK).json({ message: 'Sign In Successful' });
  };

  logOut = async (req: Request, res: Response, next: NextFunction) => {
    res
      .clearCookie('accessToken')
      .status(StatusCodes.OK)
      .json({ message: 'User logged out successfully' });
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({
      message: 'Current User Details',
      data: req.currentUser,
    });
  };
}

export default AuthController;
