-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_storeId_fkey`;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE CASCADE ON UPDATE CASCADE;
