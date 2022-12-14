/*
  Warnings:

  - You are about to drop the column `content` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `subject` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `content`,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL,
    ADD COLUMN `target` VARCHAR(191) NULL;
