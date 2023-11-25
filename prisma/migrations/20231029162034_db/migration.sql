/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cota` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `cars`;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `cota`;

-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,
    `prenom` VARCHAR(50) NULL,
    `pseudo` VARCHAR(50) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `tel` VARCHAR(10) NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `email_user`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `docker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,
    `prenom` VARCHAR(50) NULL,
    `num_cin` VARCHAR(12) NOT NULL,
    `equipe_id` INTEGER NULL,

    UNIQUE INDEX `num_cin_docker`(`num_cin`),
    INDEX `fk_docker_equipe`(`equipe_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_equipe` VARCHAR(50) NOT NULL,
    `date_operation` DATE NOT NULL,
    `shift_id` INTEGER NOT NULL,

    INDEX `fk_equipe_shift`(`shift_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_navire` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pointage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_pointage` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `poids_marchandise` DECIMAL(10, 2) NOT NULL,
    `poids_salissant` DECIMAL(10, 2) NOT NULL,
    `equipe_id` INTEGER NOT NULL,
    `navire_id` INTEGER NOT NULL,
    `utilisateur_id` INTEGER NULL,

    INDEX `fk_pointage_equipe`(`equipe_id`),
    INDEX `fk_pointage_navire`(`navire_id`),
    INDEX `fk_pointage_utilisateur`(`utilisateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_shift` INTEGER NOT NULL,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `docker` ADD CONSTRAINT `fk_docker_equipe` FOREIGN KEY (`equipe_id`) REFERENCES `equipe`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `equipe` ADD CONSTRAINT `fk_equipe_shift` FOREIGN KEY (`shift_id`) REFERENCES `shift`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `fk_pointage_equipe` FOREIGN KEY (`equipe_id`) REFERENCES `equipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `fk_pointage_navire` FOREIGN KEY (`navire_id`) REFERENCES `navire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointage` ADD CONSTRAINT `fk_pointage_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
