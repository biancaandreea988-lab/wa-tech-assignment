import { NextFunction, Request, Response } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization;

  if (!auth || auth !== 'fake-access-token') {
    return res.sendStatus(401);
  }

  next();
}
