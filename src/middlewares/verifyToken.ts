import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { handleError } from '../errors/handleError';
import { CustomerModel } from '../models';
require('dotenv').config();

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET ?? '12345',
      async (err: any, decoded: any) => {
        if (err) {
          return handleError(res, 301, 'Token is expired!');
        } else {
          const user = await CustomerModel.findOne({ email: decoded.email });
          if (user) {
            req.user = user;
          }
          next();
        }
      }
    );
  } else {
    return handleError(res, 400, 'No Token!');
  }
};
