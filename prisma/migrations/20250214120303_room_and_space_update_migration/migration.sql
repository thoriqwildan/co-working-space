/*
  Warnings:

  - A unique constraint covering the columns `[space_id]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `rooms_space_id_key` ON `rooms`(`space_id`);
