import { Task } from '@prisma/client';

export class TaskDto implements Task {
  id: string;
  name: string;
  done: boolean;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
