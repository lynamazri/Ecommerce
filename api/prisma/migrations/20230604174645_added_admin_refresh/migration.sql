/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `refreshToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_refreshToken_key` ON `Admin`(`refreshToken`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_refreshToken_key` ON `Users`(`refreshToken`);
