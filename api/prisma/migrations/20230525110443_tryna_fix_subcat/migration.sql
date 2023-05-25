-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_subCatId_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCatId_fkey` FOREIGN KEY (`subCatId`) REFERENCES `SubCat`(`subCatId`) ON DELETE CASCADE ON UPDATE CASCADE;
