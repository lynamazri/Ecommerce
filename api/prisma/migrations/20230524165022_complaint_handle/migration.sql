/*
  Warnings:

  - A unique constraint covering the columns `[bankAccount]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `complaint` ADD COLUMN `handled` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Users_bankAccount_key` ON `Users`(`bankAccount`);
