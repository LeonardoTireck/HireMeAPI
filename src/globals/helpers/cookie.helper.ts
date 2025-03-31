import { Response } from 'express';

export function sendTokenToCookie(accessToken: string, res: Response) {
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
  });
}
