import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/Accounts/repositories/implementations/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token mission!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      '00d9c5e38f159412ae68b3f9cfb02e20'
    ) as IPayload;

    const usersRepository = new UserRepository();

    const userExist = await usersRepository.findById(userId);

    if (!userExist) {
      throw new Error('User does not exist!');
    }

    next();
  } catch (error) {
    throw new Error('Token invalid!');
  }
}
