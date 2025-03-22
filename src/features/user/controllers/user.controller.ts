import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json({
      message: 'users GET successfully',
      data: users,
    });
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.create(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'User created',
      data: user,
    });
  }
}

export default UserController;
