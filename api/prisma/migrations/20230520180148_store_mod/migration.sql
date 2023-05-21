/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `store` MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Store_email_key` ON `Store`(`email`);
