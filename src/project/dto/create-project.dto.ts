import { OmitType } from '@nestjs/mapped-types';
import { ProjectDto } from '../entities/project.entity';

export class CreateProjectDto extends OmitType(ProjectDto, [
  'id',
  'createdAt',
  'updatedAt',
  'userId',
]) {}
