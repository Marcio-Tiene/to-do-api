import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AuthorizationMiddleware } from '../middleware/authorization.middleware';
import { Auth } from '../auth/auth.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, AuthorizationMiddleware, Auth],
})
export class ProjectModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(ProjectController);
  }
}
