import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, Auth],
})
export class UserModule {}
