-- CreateTable
CREATE TABLE `WishList` (
    `wishlistId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WishList_userId_key`(`userId`),
    PRIMARY KEY (`wishlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToWishList` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToWishList_AB_unique`(`A`, `B`),
    INDEX `_ProductToWishList_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToWishList` ADD CONSTRAINT `_ProductToWishList_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToWishList` ADD CONSTRAINT `_ProductToWishList_B_fkey` FOREIGN KEY (`B`) REFERENCES `WishList`(`wishlistId`) ON DELETE CASCADE ON UPDATE CASCADE;
