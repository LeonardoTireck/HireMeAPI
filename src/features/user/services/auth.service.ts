import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';

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
    return user;
  }
}

export default AuthService;
