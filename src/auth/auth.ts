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
        'secret',
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
      jsonwebtoken.verify(token, 'secret', (err, decoded) => {
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
