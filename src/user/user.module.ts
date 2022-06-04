import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Auth } from 'src/auth/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, Auth, PrismaService],
})
export class UserModule {}
