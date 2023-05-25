/*
  Warnings:

  - You are about to drop the column `state` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `state`;

-- AlterTable
ALTER TABLE `orderitems` ADD COLUMN `state` VARCHAR(191) NOT NULL DEFAULT 'Pending';
