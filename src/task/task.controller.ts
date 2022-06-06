import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: string },
  ) {
    return this.taskService.create(createTaskDto, req.user);
  }

  @Get(':projectId/project')
  findAllProjectTasks(
    @Req() req: Request & { user: string },
    @Param('projectId') projectId: string,
  ) {
    return this.taskService.findAllProjectTasks(req.user, projectId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request & { user: string },
  ) {
    return this.taskService.update(id, req.user, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: string }) {
    return this.taskService.remove(id, req.user);
  }
}
