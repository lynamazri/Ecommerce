-- DropForeignKey
ALTER TABLE `subcat` DROP FOREIGN KEY `SubCat_catId_fkey`;

-- AddForeignKey
ALTER TABLE `SubCat` ADD CONSTRAINT `SubCat_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `Category`(`catId`) ON DELETE CASCADE ON UPDATE CASCADE;
