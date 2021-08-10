import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { UserRepository } from '@modules/Accounts/repositories/implementations/UserRepository';

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
    throw new AppError('Token mission!', 401);
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
      throw new AppError('User does not exist!', 401);
    }

    request.user = {
      userId,
    };

    next();
  } catch (error) {
    throw new AppError('Token invalid!', 401);
  }
}
