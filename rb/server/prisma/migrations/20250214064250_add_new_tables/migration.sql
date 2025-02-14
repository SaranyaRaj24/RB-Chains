-- AlterTable
ALTER TABLE `lotinfo` ADD COLUMN `master_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `MasterProcess` (
    `master_id` INTEGER NOT NULL AUTO_INCREMENT,
    `process_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`master_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterProcessMapper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `master_id` INTEGER NOT NULL,
    `process_id` INTEGER NOT NULL,
    `process_order_sort` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LotProcess` (
    `process_id` INTEGER NOT NULL AUTO_INCREMENT,
    `process_name` VARCHAR(191) NOT NULL,
    `process_description` VARCHAR(191) NULL,

    PRIMARY KEY (`process_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProcessSteps` (
    `step_id` INTEGER NOT NULL AUTO_INCREMENT,
    `process_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`step_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributesInfo` (
    `attribute_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute_type` VARCHAR(191) NOT NULL,
    `attribute_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lot_id` INTEGER NOT NULL,
    `item_type` VARCHAR(191) NOT NULL DEFAULT 'INITIAL',

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterJewelItemMapper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `master_jewel_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterJewelType` (
    `master_jewel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jewel_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`master_jewel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributeValue` (
    `attribute_value_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lot_id` INTEGER NOT NULL,
    `process_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    PRIMARY KEY (`attribute_value_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductStocks` (
    `stock_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `product_status` VARCHAR(191) NOT NULL DEFAULT 'active',

    PRIMARY KEY (`stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterOrder` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_status` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItems` (
    `order_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `final_price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`order_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lotInfo` ADD CONSTRAINT `lotInfo_master_id_fkey` FOREIGN KEY (`master_id`) REFERENCES `MasterProcess`(`master_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterProcessMapper` ADD CONSTRAINT `MasterProcessMapper_master_id_fkey` FOREIGN KEY (`master_id`) REFERENCES `MasterProcess`(`master_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterProcessMapper` ADD CONSTRAINT `MasterProcessMapper_process_id_fkey` FOREIGN KEY (`process_id`) REFERENCES `LotProcess`(`process_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcessSteps` ADD CONSTRAINT `ProcessSteps_process_id_fkey` FOREIGN KEY (`process_id`) REFERENCES `LotProcess`(`process_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcessSteps` ADD CONSTRAINT `ProcessSteps_attribute_id_fkey` FOREIGN KEY (`attribute_id`) REFERENCES `AttributesInfo`(`attribute_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_lot_id_fkey` FOREIGN KEY (`lot_id`) REFERENCES `lotInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterJewelItemMapper` ADD CONSTRAINT `MasterJewelItemMapper_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterJewelItemMapper` ADD CONSTRAINT `MasterJewelItemMapper_master_jewel_id_fkey` FOREIGN KEY (`master_jewel_id`) REFERENCES `MasterJewelType`(`master_jewel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeValue` ADD CONSTRAINT `AttributeValue_lot_id_fkey` FOREIGN KEY (`lot_id`) REFERENCES `lotInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeValue` ADD CONSTRAINT `AttributeValue_process_id_fkey` FOREIGN KEY (`process_id`) REFERENCES `LotProcess`(`process_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeValue` ADD CONSTRAINT `AttributeValue_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStocks` ADD CONSTRAINT `ProductStocks_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterOrder` ADD CONSTRAINT `MasterOrder_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `CustomerInfo`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `MasterOrder`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `ProductStocks`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
