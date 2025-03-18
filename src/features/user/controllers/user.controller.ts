import { NextFunction, Request, Response } from 'express';

class UserController {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: 'users GET successfully',
      data: [],
    });
  }
}

export default new UserController();
