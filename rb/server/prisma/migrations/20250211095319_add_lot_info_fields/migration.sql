/*
  Warnings:

  - You are about to drop the `lot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `lot`;

-- CreateTable
CREATE TABLE `lotInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lot_name` VARCHAR(191) NOT NULL,
    `lot_before_weight` DOUBLE NOT NULL,
    `lot_after_weight` DOUBLE NOT NULL,
    `lot_difference_weight` DOUBLE NOT NULL,
    `lot_comments` VARCHAR(191) NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
