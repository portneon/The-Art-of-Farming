-- CreateTable PlantSpecies
CREATE TABLE `PlantSpecies` (
    `id` VARCHAR(191) NOT NULL,
    `common_name` VARCHAR(191) NOT NULL,
    `scientific_name` VARCHAR(191) NOT NULL,
    `family` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191),
    `description` LONGTEXT NOT NULL,
    `care_water` TEXT NOT NULL,
    `care_light` TEXT NOT NULL,
    `care_humidity` TEXT NOT NULL,
    `care_temperature` TEXT NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PlantSpecies_common_name_key`(`common_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
