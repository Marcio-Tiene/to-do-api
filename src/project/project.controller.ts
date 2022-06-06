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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request & { user: string },
  ) {
    return this.projectService.create(createProjectDto, req.user);
  }

  @Get()
  findAll(@Req() req: Request & { user: string }) {
    return this.projectService.findAll(req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: Request & { user: string },
  ) {
    return this.projectService.update(id, updateProjectDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: string }) {
    return this.projectService.remove(id, req.user);
  }
}
