import { BadRequestException } from '../../../globals/cores/error.core';
import prisma from '../../../globals/prisma';

class CandidateProfileService {
  getAll = async (requestBody: any, currentUser: UserPayload) => {
    const allCandidates = await prisma.candidateProfile.findMany();
    return allCandidates;
  };

  getOne = async (id: number, currentUser: UserPayload) => {
    // logic to check if logged user is admin
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { id },
    });
    if (!candidateProfile) {
      throw new BadRequestException(`Candidate with id:${id} does not exist.`);
    }
    return candidateProfile;
  };

  create = async (requestBody: any, currentUser: UserPayload) => {
    const { address, birth_date, cv, full_name, gender, phone } = requestBody;

    const candidateProfile = await prisma.candidateProfile.create({
      data: {
        address,
        birth_date: new Date(birth_date),
        cv,
        full_name,
        gender,
        phone,
        userId: currentUser.id,
      },
    });

    return candidateProfile;
  };

  deleteOne = async (req: any, currentUser: UserPayload) => {
    const id = req.body.userId;
    try {
      const deletionProccess = await prisma.candidateProfile.delete({
        where: { id },
      });
      return deletionProccess;
    } catch (error) {
      console.log(error);
    }
  };
}

export default CandidateProfileService;
