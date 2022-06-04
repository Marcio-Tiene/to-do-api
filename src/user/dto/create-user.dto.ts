import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from '../entities/user.entity';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
