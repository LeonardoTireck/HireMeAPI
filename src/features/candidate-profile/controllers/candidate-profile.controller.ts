import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class CandidateProfileController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    // Logic to get all candidate profiles
    res.status(StatusCodes.OK).json({
      message: 'Details of all candidate profiles',
    });
  }
}

export default CandidateProfileController;
