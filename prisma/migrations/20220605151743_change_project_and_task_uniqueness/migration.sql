/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,project_id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "projects_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_user_id_key" ON "projects"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_project_id_key" ON "tasks"("name", "project_id");
