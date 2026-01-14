/*
  Warnings:

  - A unique constraint covering the columns `[common_name]` on the table `PlantSpecies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PlantSpecies_common_name_key` ON `PlantSpecies`(`common_name`);
