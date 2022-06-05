import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth } from '../auth/auth.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(protected auth: Auth) {}
  protected unauthorizedRes(message: string | Record<any, any>) {
    throw new HttpException(
      { errors: { general: message } },
      HttpStatus.UNAUTHORIZED,
    );
  }
  async use(
    req: Request & { user: string },
    res: Response,
    next: NextFunction,
  ) {
    const { headers } = req;
    const { authorization } = headers;
    if (!authorization) {
      this.unauthorizedRes('No Authorization sended');
    }

    const [, token] = authorization.split(' ');
    if (!token) {
      this.unauthorizedRes('No token sended');
    }

    const { isValid, decodedToken } = await this.auth.verifyAndDecodeToken(
      token,
    );

    if (!isValid) {
      this.unauthorizedRes('Invalid token');
    }

    req.user = decodedToken?.id ?? '';
    next();
  }
}
