-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_discountId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `discountId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`discountId`) ON DELETE SET NULL ON UPDATE CASCADE;
