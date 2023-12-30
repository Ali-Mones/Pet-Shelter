DELIMITER //

CREATE FUNCTION getDistinctPetSpecies() RETURNS VARCHAR(255) DETERMINISTIC
BEGIN
    DECLARE speciesList VARCHAR(1000);

    SELECT GROUP_CONCAT(DISTINCT pet_species SEPARATOR ', ')
    INTO speciesList
    FROM pet;

    RETURN speciesList;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION getDistinctPetBreeds() RETURNS VARCHAR(255) DETERMINISTIC
BEGIN
    DECLARE breedList VARCHAR(1000);

    SELECT GROUP_CONCAT(DISTINCT pet_breed SEPARATOR ', ')
    INTO breedList
    FROM pet;

    RETURN breedList;
END //

DELIMITER ;

DELIMITER //
CREATE FUNCTION getDistinctShelterLocations() RETURNS VARCHAR(255) DETERMINISTIC
BEGIN
    DECLARE locationList VARCHAR(1000);

    SELECT GROUP_CONCAT(DISTINCT shelter_location SEPARATOR ', ')
    INTO locationList
    FROM pet
    INNER JOIN shelter ON pet.shelter_id = shelter.shelter_id;

    RETURN locationList;
END;
DELIMITER ;

DELIMITER //

CREATE PROCEDURE getMinPetAge(OUT minAge INT)
BEGIN
    SELECT MIN(pet_age) INTO minAge FROM pet;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE countShelterRecords(IN shelterId INT, OUT recordCount INT)
BEGIN
    SELECT COUNT(*) INTO recordCount
    FROM shelter
    WHERE shelter_id = shelterId;
END //

DELIMITER ;

