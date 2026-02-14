-- DropForeignKey
ALTER TABLE `Plant` DROP FOREIGN KEY `Plant_userId_fkey`;

-- AlterTable
ALTER TABLE `Plant` ADD COLUMN `gardenId` VARCHAR(191) NULL,
    ADD COLUMN `healthStatus` VARCHAR(191) NULL DEFAULT 'Good',
    ADD COLUMN `lastFertilized` DATETIME(3) NULL,
    ADD COLUMN `lastWatered` DATETIME(3) NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `plantSpeciesId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Garden` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Garden_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Plant_gardenId_idx` ON `Plant`(`gardenId`);

-- CreateIndex
CREATE INDEX `Plant_plantSpeciesId_idx` ON `Plant`(`plantSpeciesId`);

-- AddForeignKey
ALTER TABLE `Garden` ADD CONSTRAINT `Garden_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_gardenId_fkey` FOREIGN KEY (`gardenId`) REFERENCES `Garden`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_plantSpeciesId_fkey` FOREIGN KEY (`plantSpeciesId`) REFERENCES `PlantSpecies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Plant` RENAME INDEX `Plant_userId_fkey` TO `Plant_userId_idx`;
