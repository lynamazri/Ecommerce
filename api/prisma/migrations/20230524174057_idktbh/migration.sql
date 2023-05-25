/*
  Warnings:

  - Made the column `credit` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `credit` INTEGER NOT NULL DEFAULT 0;
