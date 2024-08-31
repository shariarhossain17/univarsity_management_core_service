import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/apiError';
import { jwtHelpers } from '../helper/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      console.log(token);
      if (!token) {
        throw new ApiError(401, 'unauthorized access');
      }

      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, 'forbidden access');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
