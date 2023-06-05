/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `StoreImage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `storeimage` DROP FOREIGN KEY `StoreImage_storeId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `StoreImage_storeId_key` ON `StoreImage`(`storeId`);

-- AddForeignKey
ALTER TABLE `StoreImage` ADD CONSTRAINT `StoreImage_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
