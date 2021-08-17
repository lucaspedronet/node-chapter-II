import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = request.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);

  if (!user.isAdmin) {
    throw new AppError('User is not an admin');
  }

  return next();
}
