/*
  Warnings:

  - You are about to drop the column `subCatId` on the `store` table. All the data in the column will be lost.
  - Added the required column `catId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `Store_subCatId_fkey`;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `subCatId`,
    ADD COLUMN `catId` INTEGER NOT NULL,
    ADD COLUMN `workingHours` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_catId_fkey` FOREIGN KEY (`catId`) REFERENCES `Category`(`catId`) ON DELETE RESTRICT ON UPDATE CASCADE;
