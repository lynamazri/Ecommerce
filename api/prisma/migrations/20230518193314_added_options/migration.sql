-- CreateTable
CREATE TABLE `ProductOptions` (
    `optionId` INTEGER NOT NULL AUTO_INCREMENT,
    `option` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `valueId` INTEGER NOT NULL,

    PRIMARY KEY (`optionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OptionValue` (
    `valueId` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`valueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductOptions` ADD CONSTRAINT `ProductOptions_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOptions` ADD CONSTRAINT `ProductOptions_valueId_fkey` FOREIGN KEY (`valueId`) REFERENCES `OptionValue`(`valueId`) ON DELETE RESTRICT ON UPDATE CASCADE;
