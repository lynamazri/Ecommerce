/*
  Warnings:

  - Added the required column `name` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `storeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
