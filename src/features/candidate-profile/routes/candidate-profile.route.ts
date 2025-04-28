import express from 'express';
import CandidateProfileController from '../controllers/candidate-profile.controller';

const candidateProfileController = new CandidateProfileController();

const candidateProfileRoutes = express.Router();

candidateProfileRoutes.get('/', candidateProfileController.getAll);

export default candidateProfileRoutes;
