import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthorizationMiddleware } from 'src/middleware/authorization.middleware';
import { Auth } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, AuthorizationMiddleware, Auth, PrismaService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(TaskController);
  }
}
