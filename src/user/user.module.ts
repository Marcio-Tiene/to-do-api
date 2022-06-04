import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Auth } from 'src/auth/auth';

@Module({
  controllers: [UserController],
  providers: [UserService, Auth],
})
export class UserModule {}
