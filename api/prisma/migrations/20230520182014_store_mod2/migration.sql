-- DropForeignKey
ALTER TABLE `userstore` DROP FOREIGN KEY `UserStore_storeId_fkey`;

-- AddForeignKey
ALTER TABLE `UserStore` ADD CONSTRAINT `UserStore_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE CASCADE ON UPDATE CASCADE;
