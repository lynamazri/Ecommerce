/*
  Warnings:

  - Added the required column `subCatId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `subCatId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_subCatId_fkey` FOREIGN KEY (`subCatId`) REFERENCES `SubCat`(`subCatId`) ON DELETE RESTRICT ON UPDATE CASCADE;
