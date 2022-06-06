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
    const task = await this.prisma.task
      .create({
        data,
      })
      .catch((error) => {
        this.errorHandler(error, 'Task already exists');
      });
    return task;
  }

  async findAllProjectTasks(userId: string, projectId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { userId, projectId },
    });
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task
      .updateMany({
        where: { id, userId },
        data: updateTaskDto,
      })
      .catch((error) => {
        this.errorHandler(error);
      });
    if (!!task[0] && !Object.keys(task[0]).length) {
      this.errorHandler({ message: "You can't update this task" });
    }

    return task[0];
  }

  async remove(id: string, userId: string) {
    const task = await this.prisma.task
      .findFirst({
        where: { id, userId },
      })
      .catch(() => {
        this.errorHandler({ message: 'You cant delete this task' });
      });

    if (!task) {
      this.errorHandler({ message: 'You cant delete this task' });
    }
    await this.prisma.task
      .deleteMany({
        where: { id, userId },
      })
      .catch((error) => {
        this.errorHandler(error);
      });

    return { message: 'deleted' };
  }
}
