import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { BadRequestException } from '../../../globals/cores/error.core';
import { generateToken } from '../../../globals/helpers/jwt.helper';

class AuthService {
  async signup(requestBody: any) {
    const { name, email, password } = requestBody;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: 'CANDIDATE',
      },
    });
    const jwt_secret = process.env.JWT_SECRET;
    let accessToken: string;
    if (jwt_secret) {
      accessToken = generateToken(user);
    } else {
      throw new Error('JWT secret not found.');
    }
    return accessToken;
  }

  async signIn(requestBody: any) {
    const { email, password } = requestBody;

    //check email exists
    const user = await this.findUserByEmail(email);

    if (!user) throw new BadRequestException(`Email ${email} doesn't exist.`);
    //check password match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestException(`Invalid password`);
    //create token
    const accessToken = generateToken(user);
    return accessToken;
  }

  private async findUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }
}

export default AuthService;
