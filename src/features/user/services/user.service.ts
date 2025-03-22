import { User } from '@prisma/client';
import prisma from '../../../globals/prisma';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestException } from '../../../globals/cores/error.code';

class UserService {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }
  async create(requestBody: any): Promise<User> {
    const checkEmail = await prisma.user.findFirst(requestBody);
    if (checkEmail) {
      throw new BadRequestException('Email already exists.');
    }
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
