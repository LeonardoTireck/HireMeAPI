import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import createUserSchema from '../schemas/createuser.schema';
import { BadRequestException } from '../../../globals/cores/error.core';

class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json({
      message: 'users GET successfully',
      data: users,
    });
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = createUserSchema.validate(req.body);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'errors',
        error,
      });
      return;
    }
    const user = await this.userService.create(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'User created',
      data: user,
    });
  };
}

export default UserController;
