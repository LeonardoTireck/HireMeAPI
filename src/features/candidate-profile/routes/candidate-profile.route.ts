import express from 'express';
import CandidateProfileController from '../controllers/candidate-profile.controller';
import { verifyUser } from '../../../globals/middlewares/verifyUser.middleware';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';
import CandidateProfileService from '../services/candidate-profile.service';
const candidateProfileService = new CandidateProfileService();
const candidateProfileController = new CandidateProfileController(
  candidateProfileService,
);

const candidateProfileRoutes = express.Router();

candidateProfileRoutes.get(
  '/',
  asyncWrapper(candidateProfileController.getAll),
);
candidateProfileRoutes.get(
  '/:id',
  verifyUser,
  asyncWrapper(candidateProfileController.getOne),
);
candidateProfileRoutes.post(
  '/new',
  verifyUser,
  asyncWrapper(candidateProfileController.create),
);
candidateProfileRoutes.post(
  '/delete',
  verifyUser,
  asyncWrapper(candidateProfileController.deleteOne),
);

export default candidateProfileRoutes;
