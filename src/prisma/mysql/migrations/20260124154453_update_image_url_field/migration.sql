/*
  Warnings:

  - You are about to drop the column `price` on the `PlantSpecies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PlantSpecies` DROP COLUMN `price`,
    MODIFY `image_url` TEXT NOT NULL;
