import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

interface IToken {
  name: string;
  id: string;
  exp: string;
  iat: string;
}
interface IVerifiedToken {
  isValid: boolean;
  decodedToken?: IToken;
}
@Injectable()
export class Auth {
  async signIn<Payload extends Record<any, any>>(
    payload: Payload,
  ): Promise<string> {
    const jwt = new Promise((resolve) => {
      jsonwebtoken.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' },
        (err, encoded) => {
          if (err) {
            return resolve('');
          }

          return resolve(encoded);
        },
      );
    });

    return (await jwt) as unknown as string;
  }

  async verifyAndDecodeToken(token: string): Promise<IVerifiedToken> {
    const jwt = new Promise((resolve) => {
      jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          const isValid = false;
          return resolve({ isValid });
        }

        return resolve({ isValid: true, decodedToken: decoded });
      });
    });
    return (await jwt) as unknown as IVerifiedToken;
  }
}
