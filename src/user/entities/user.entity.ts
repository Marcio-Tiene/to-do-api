import { User } from '@prisma/client';

export class UserDto implements User {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
