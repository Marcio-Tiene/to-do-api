import { Auth } from 'src/auth/auth.service';
import { AuthorizationMiddleware } from './authorization.middleware';

describe('AuthorizationMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthorizationMiddleware(new Auth())).toBeDefined();
  });
});
