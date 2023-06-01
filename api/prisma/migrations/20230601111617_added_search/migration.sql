-- CreateIndex
CREATE FULLTEXT INDEX `Product_name_description_idx` ON `Product`(`name`, `description`);
