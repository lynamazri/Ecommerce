/*
  Warnings:

  - You are about to drop the `_producttowishlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_producttowishlist` DROP FOREIGN KEY `_ProductToWishList_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttowishlist` DROP FOREIGN KEY `_ProductToWishList_B_fkey`;

-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_producttowishlist`;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
