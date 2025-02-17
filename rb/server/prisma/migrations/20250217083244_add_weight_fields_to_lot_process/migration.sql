-- AlterTable
ALTER TABLE `lotprocess` ADD COLUMN `afterWeight` VARCHAR(191) NULL,
    ADD COLUMN `beforeWeight` VARCHAR(191) NULL,
    ADD COLUMN `difference` INTEGER NULL;
