import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(protected prisma: PrismaService) {}

  protected errorHandler(error: any, message = '') {
    if (error?.meta?.target?.includes('name')) {
      throw new HttpException(
        { errors: { name: message } },
        HttpStatus.CONFLICT,
      );
    }
    throw new HttpException(
      { errors: { general: error.message } },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const data = {
      ...createTaskDto,
      name: createTaskDto.name?.trim(),
      userId,
    };

    const { name } = createTaskDto;
    if (!name?.trim()) {
      this.errorHandler({ message: "Task name can't be null" });
    }
    const task = await this.prisma.task.create({
      data,
    });
    return task;
  }

  async findAllProjectTasks(userId, projectId) {
    const tasks = await this.prisma.task.findMany({
      where: { userId, projectId },
    });
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
