import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../cores/error.core';
import jwt from 'jsonwebtoken';

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  //get the token from the cookie
  const accessToken = req.cookies?.accessToken;
  if (!accessToken)
    throw new BadRequestException('Cannot find accessToken cookie');
  //verify the token agains jwt
  const user = jwt.verify(accessToken, process.env.JWT_SECRET!) as UserPayload;
  req.currentUser = user;
  next();
}
