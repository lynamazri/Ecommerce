/*
  Warnings:

  - You are about to drop the column `optionId` on the `orderitems` table. All the data in the column will be lost.
  - You are about to drop the `productoptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_optionId_fkey`;

-- DropForeignKey
ALTER TABLE `productoptions` DROP FOREIGN KEY `ProductOptions_productId_fkey`;

-- AlterTable
ALTER TABLE `orderitems` DROP COLUMN `optionId`;

-- DropTable
DROP TABLE `productoptions`;
