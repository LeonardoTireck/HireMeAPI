import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
      accessToken = jwt.sign({ name, email, id: user.id }, jwt_secret, {
        expiresIn: '1d',
      });
    } else {
      throw new Error('JWT secret not found.');
    }

    return accessToken;
  }
}

export default AuthService;
