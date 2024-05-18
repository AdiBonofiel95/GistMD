/*
  Warnings:

  - Added the required column `language` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operation` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `operation` VARCHAR(191) NOT NULL;
