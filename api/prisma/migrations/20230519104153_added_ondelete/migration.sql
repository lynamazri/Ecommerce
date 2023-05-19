-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_storeId_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE CASCADE ON UPDATE CASCADE;
