import { User } from '@prisma/client';
import prisma from '../../../globals/prisma';
import { BadRequestException } from '../../../globals/cores/error.core';

class UserService {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }
  async create(requestBody: any): Promise<User> {
    const { name, email, password, role } = requestBody;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    return user;
  }
}

export default UserService;
