/*
  Warnings:

  - Added the required column `subCatId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `subCatId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `catId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`catId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCat` (
    `subCatId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `catId` INTEGER NOT NULL,

    PRIMARY KEY (`subCatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCatId_fkey` FOREIGN KEY (`subCatId`) REFERENCES `SubCat`(`subCatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCat` ADD CONSTRAINT `SubCat_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `Category`(`catId`) ON DELETE RESTRICT ON UPDATE CASCADE;
