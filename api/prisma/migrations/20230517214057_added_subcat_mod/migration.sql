/*
  Warnings:

  - You are about to drop the column `description` on the `subcat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` MODIFY `description` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `subcat` DROP COLUMN `description`;
