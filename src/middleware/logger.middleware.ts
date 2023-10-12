import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['access-token'];

    if (!token) {
      throw new HttpException(
        { message: 'Token is not exist.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
      ) as jwt.JwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      // console.log(decoded.exp - currentTime);
    } catch (error) {
      // Handle invalid or expired token
      res.clearCookie('access-token');
      throw new HttpException(
        { message: 'Token is not expired token.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
