import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
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
  async create(createProjectDto: CreateProjectDto, userId: string) {
    const data = {
      ...createProjectDto,
      name: createProjectDto.name?.trim(),
      userId,
    };
    const { name } = createProjectDto;
    if (!name?.trim()) {
      this.errorHandler({ message: "Title can't be null" });
    }
    const project = await this.prisma.project
      .create({ data })
      .catch((error) => {
        this.errorHandler(error, 'Project already exists');
      });

    return project;
  }

  async findAll(userId: string) {
    const projects = await this.prisma.project.findMany({ where: { userId } });
    return projects;
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, userId },
    });
    return project ?? {};
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    const { name } = updateProjectDto;
    if (!name?.trim()) {
      this.errorHandler({ message: "Title can't be null" });
    }
    const project = await this.prisma.project
      .updateMany({
        where: { id, userId },
        data: updateProjectDto,
      })
      .catch((error) => {
        this.errorHandler(error);
      });
    if (!!project[0] && !Object.keys(project[0]).length) {
      this.errorHandler({ message: "You can't update this project" });
    }

    return project[0];
  }

  async remove(id: string, userId: string) {
    const project = await this.findOne(id, userId);

    if (!Object.keys(project).length) {
      this.errorHandler({ message: 'You cant delete this project' });
    }
    await this.prisma.project
      .deleteMany({
        where: { id, userId },
      })
      .catch((error) => {
        this.errorHandler(error);
      });

    return { message: 'deleted' };
  }
}
