import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
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

    return jwt as unknown as string;
  }

  async verifyAndDecodeToken(token: string) {
    const jwt = new Promise((resolve) => {
      jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          const isValid = false;
          return resolve({ isValid, token: {} });
        }

        return resolve({ isValid: true, token: decoded });
      });
    });
    return jwt;
  }
}
