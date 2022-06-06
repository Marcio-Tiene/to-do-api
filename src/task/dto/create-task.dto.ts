import { PickType } from '@nestjs/mapped-types';
import { TaskDto } from '../entities/task.entity';

export class CreateTaskDto extends PickType(TaskDto, ['name', 'projectId']) {}
