/*
  Warnings:

  - You are about to drop the column `list_id` on the `attributevalue` table. All the data in the column will be lost.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `_itemtolotinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productservice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lot_id` to the `attributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_type` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_itemtolotinfo` DROP FOREIGN KEY `_ItemToLotInfo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_itemtolotinfo` DROP FOREIGN KEY `_ItemToLotInfo_B_fkey`;

-- DropForeignKey
ALTER TABLE `attributevalue` DROP FOREIGN KEY `attributeValue_items_id_fkey`;

-- DropForeignKey
ALTER TABLE `attributevalue` DROP FOREIGN KEY `attributeValue_list_id_fkey`;

-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `orderItems_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `productservice` DROP FOREIGN KEY `productService_item_id_fkey`;

-- DropIndex
DROP INDEX `attributeValue_items_id_fkey` ON `attributevalue`;

-- DropIndex
DROP INDEX `attributeValue_list_id_fkey` ON `attributevalue`;

-- DropIndex
DROP INDEX `orderItems_stock_id_fkey` ON `orderitems`;

-- AlterTable
ALTER TABLE `attributevalue` DROP COLUMN `list_id`,
    ADD COLUMN `lot_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `item` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `item_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `lot_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`item_id`);

-- DropTable
DROP TABLE `_itemtolotinfo`;

-- DropTable
DROP TABLE `productservice`;

-- CreateTable
CREATE TABLE `ProductStocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `product_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ItemLotInfos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemLotInfos_AB_unique`(`A`, `B`),
    INDEX `_ItemLotInfos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attributeValue` ADD CONSTRAINT `attributeValue_lot_id_fkey` FOREIGN KEY (`lot_id`) REFERENCES `lotInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attributeValue` ADD CONSTRAINT `attributeValue_items_id_fkey` FOREIGN KEY (`items_id`) REFERENCES `item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStocks` ADD CONSTRAINT `ProductStocks_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemLotInfos` ADD CONSTRAINT `_ItemLotInfos_A_fkey` FOREIGN KEY (`A`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemLotInfos` ADD CONSTRAINT `_ItemLotInfos_B_fkey` FOREIGN KEY (`B`) REFERENCES `lotInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
