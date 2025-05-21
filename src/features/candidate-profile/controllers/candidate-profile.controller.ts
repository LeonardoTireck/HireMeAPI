import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CandidateProfileService from '../services/candidate-profile.service';

class CandidateProfileController {
  private candidateProfileService: CandidateProfileService;
  constructor(candidateProfileService: CandidateProfileService) {
    this.candidateProfileService = candidateProfileService;
  }
  deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const deleteACandidate = await this.candidateProfileService.deleteOne(
      req,
      req.currentUser,
    );
    res.status(StatusCodes.OK).json({
      message: 'Candidate deleted',
      data: deleteACandidate,
    });
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    // Logic to get all candidate profiles
    const allCandidates = await this.candidateProfileService.getAll(
      req.body,
      req.currentUser,
    );
    res.status(StatusCodes.OK).json({
      data: allCandidates,
    });
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const candidate = await this.candidateProfileService.getOne(
      +req.params.id,
      req.currentUser,
    );
    res.status(StatusCodes.OK).json({
      message: 'Candidate found.',
      data: candidate,
    });
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    // Logic to create a new candidate profile
    const candidateProfile = await this.candidateProfileService.create(
      req.body,
      req.currentUser,
    );

    res.status(StatusCodes.CREATED).json({
      message: 'User created.',
      data: candidateProfile,
    });
  };
}

export default CandidateProfileController;
