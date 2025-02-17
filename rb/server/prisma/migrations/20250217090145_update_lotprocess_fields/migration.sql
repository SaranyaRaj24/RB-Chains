/*
  Warnings:

  - You are about to alter the column `afterWeight` on the `lotprocess` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `beforeWeight` on the `lotprocess` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `difference` on the `lotprocess` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `lotprocess` MODIFY `afterWeight` DOUBLE NULL,
    MODIFY `beforeWeight` DOUBLE NULL,
    MODIFY `difference` DOUBLE NULL;
