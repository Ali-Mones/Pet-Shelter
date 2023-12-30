-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pet_shelter
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `pet_shelter`;

-- -----------------------------------------------------
-- Schema pet_shelter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pet_shelter` DEFAULT CHARACTER SET utf8;
USE `pet_shelter`;

-- -----------------------------------------------------
-- Table `pet_shelter`.`SHELTER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`SHELTER`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`SHELTER`
(
    `shelter_id`       BIGINT      NOT NULL AUTO_INCREMENT,
    `shelter_name`     VARCHAR(45) NULL,
    `shelter_location` VARCHAR(45) NULL,
    `shelter_phone`    VARCHAR(11) NULL,
    `shelter_email`    VARCHAR(45) NULL,
    PRIMARY KEY (`shelter_id`)
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`STAFF_MEMBER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`STAFF_MEMBER`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`STAFF_MEMBER`
(
    `staff_id`            BIGINT                        NOT NULL AUTO_INCREMENT,
    `staff_name`          VARCHAR(45)                   NULL,
    `staff_phone`         VARCHAR(11)                   NULL,
    `staff_email`         VARCHAR(45)                   NULL,
    `staff_password_salt` VARCHAR(2000)                 NULL,
    `staff_password_hash` VARCHAR(2000)                 NULL,
    `staff_role`          ENUM ('MANAGER', 'CARETAKER') NULL,
    PRIMARY KEY (`staff_id`)
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`ADOPTER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`ADOPTER`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`ADOPTER`
(
    `adopter_id`            BIGINT        NOT NULL AUTO_INCREMENT,
    `adopter_name`          VARCHAR(45)   NULL,
    `adopter_phone`         VARCHAR(11)   NULL,
    `adopter_email`         VARCHAR(45)   NULL,
    `adopter_password_salt` VARCHAR(2000) NULL,
    `adopter_password_hash` VARCHAR(2000) NULL,
    PRIMARY KEY (`adopter_id`)
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`STAFF_MEMBER_SHELTER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shelter`.`STAFF_MEMBER_SHELTER`
(
    `staff_id`   BIGINT NOT NULL,
    `shelter_id` BIGINT NOT NULL,
    PRIMARY KEY (`staff_id`, `shelter_id`),
    INDEX `shelter_id_idx` (`shelter_id` ASC) VISIBLE,
    FOREIGN KEY (`staff_id`)
        REFERENCES `pet_shelter`.`STAFF_MEMBER` (`staff_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (`shelter_id`)
        REFERENCES `pet_shelter`.`SHELTER` (`shelter_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`PET`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`PET`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`PET`
(
    `pet_id`              BIGINT                  NOT NULL AUTO_INCREMENT,
    `shelter_id`          BIGINT                  NULL,
    `adopter_id`          BIGINT                  NULL,
    `pet_name`            VARCHAR(45)             NULL,
    `pet_species`         VARCHAR(45)             NULL,
    `pet_breed`           VARCHAR(45)             NULL,
    `pet_age`             INT                     NULL,
    `pet_gender`          ENUM ('MALE', 'FEMALE') NULL,
    `pet_health_status`   VARCHAR(255)            NULL,
    `pet_behaviour`       VARCHAR(45)             NULL,
    `pet_description`     VARCHAR(255)            NULL,
    `pet_house_training`  BOOLEAN                 NULL,
    `pet_spayed_neutered` BOOLEAN                 NULL,
    PRIMARY KEY (`pet_id`),
    INDEX `shelter_id_idx` (`shelter_id` ASC) VISIBLE,
    INDEX `adopter_id_idx` (`adopter_id` ASC) VISIBLE,
    FOREIGN KEY (`shelter_id`)
        REFERENCES `pet_shelter`.`SHELTER` (`shelter_id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (`adopter_id`)
        REFERENCES `pet_shelter`.`ADOPTER` (`adopter_id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`PET_DOCUMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`PET_DOCUMENT`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`PET_DOCUMENT`
(
    `document_id`   BIGINT      NOT NULL,
    `pet_id`        BIGINT      NULL,
    `document_name` VARCHAR(45) NULL,
    `document_type` VARCHAR(45) NULL,
    `document`      MEDIUMBLOB  NULL,
    PRIMARY KEY (`document_id`),
    FOREIGN KEY (`pet_id`)
        REFERENCES `pet_shelter`.`PET` (`pet_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`ADOPTION_APPLICATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`ADOPTION_APPLICATION`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`ADOPTION_APPLICATION`
(
    `pet_id`             BIGINT                                   NULL,
    `adopter_id`         BIGINT                                   NULL,
    `application_status` ENUM ('PENDING', 'APPROVED', 'REJECTED') NULL,
    INDEX `pet_id_idx` (`pet_id` ASC) VISIBLE,
    INDEX `adopter_id_idx` (`adopter_id` ASC) VISIBLE,
    FOREIGN KEY (`pet_id`)
        REFERENCES `pet_shelter`.`PET` (`pet_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (`adopter_id`)
        REFERENCES `pet_shelter`.`ADOPTER` (`adopter_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pet_shelter`.`VACCINATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet_shelter`.`VACCINATION`;

CREATE TABLE IF NOT EXISTS `pet_shelter`.`VACCINATION`
(
    `pet_id`      BIGINT      NOT NULL,
    `vaccination` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`pet_id`, `vaccination`),
    FOREIGN KEY (`pet_id`)
        REFERENCES `pet_shelter`.`PET` (`pet_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
    ENGINE = InnoDB;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
