package com.petshelter.repo;

import com.petshelter.model.Pet;
import com.petshelter.model.Request.FilterRequest;
import com.petshelter.model.enums.Gender;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Data
@Repository
public class PetRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public long save(Pet pet) {
        String sql = "INSERT INTO pet (shelter_id, pet_name, pet_species, pet_breed, pet_age, pet_gender, pet_health_status" +
                ", pet_behaviour, pet_description, pet_house_training, pet_spayed_neutered) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, pet.getShelterId());
            ps.setString(2, pet.getName());
            ps.setString(3, pet.getSpecies());
            ps.setString(4, pet.getBreed());
            ps.setInt(5, pet.getAge());
            ps.setString(6, pet.getGender().name());
            ps.setString(7, pet.getHealthStatus());
            ps.setString(8, pet.getBehaviour());
            ps.setString(9, pet.getDescription());
            ps.setBoolean(10, pet.getHouseTraining());
            ps.setBoolean(11, pet.getSpayedNeutered());
            return ps;
        }, keyHolder);

        return keyHolder.getKey() != null ? keyHolder.getKey().longValue() : -1;
    }

    public void updatePetById(Pet updatedPet) {
        String sql = "UPDATE pet " +
                "SET shelter_id = ?, pet_name = ?, pet_species = ?, pet_breed = ?, pet_age = ?, " +
                "pet_gender = ?, pet_health_status = ?, pet_behaviour = ?, pet_description = ?, " +
                "pet_house_training = ?, pet_spayed_neutered = ? " +
                "WHERE pet_id = ?";

        jdbcTemplate.update(sql,
                updatedPet.getShelterId(),
                updatedPet.getName(),
                updatedPet.getSpecies(),
                updatedPet.getBreed(),
                updatedPet.getAge(),
                updatedPet.getGender().name(),
                updatedPet.getHealthStatus(),
                updatedPet.getBehaviour(),
                updatedPet.getDescription(),
                updatedPet.getHouseTraining(),
                updatedPet.getSpayedNeutered(),
                updatedPet.getId());
    }

    public void deletePetById(long petId) {
        String sql = "DELETE FROM pet WHERE pet_id = ?";
        jdbcTemplate.update(sql, petId);
    }

    public Pet findById(long petId) {
        String sql = "SELECT * FROM pet WHERE pet.pet_id = " + petId;

        List<Pet> pets = jdbcTemplate.query(sql, getPetRowMapper());
        return !pets.isEmpty() ? pets.getFirst() : null;
    }

    public List<Pet> filterPets(FilterRequest filterRequest, int pageSize, int pageIndex) {
        StringBuilder sql = new StringBuilder("SELECT pet_id,pet.shelter_id, pet_name, pet_species, pet_breed, pet_age, pet_gender, pet_health_status" +
                ", pet_behaviour, pet_description, pet_house_training, pet_spayed_neutered FROM pet");

        if (filterRequest == null) {
            sql.append(" LIMIT ").append(pageSize).append(" OFFSET ").append(pageSize * pageIndex);
            return jdbcTemplate.query(sql.toString(), getPetRowMapper());
        }

        if (filterRequest.getShelterLocations() != null && !filterRequest.getShelterLocations().isEmpty()) {
            sql.append(" INNER JOIN shelter ON pet.shelter_id = shelter.shelter_id");
        }
        sql.append(" WHERE ");
        if (filterRequest.getShelterLocations() != null && !filterRequest.getShelterLocations().isEmpty()) {
            sql.append("shelter.shelter_location IN (").append(arrayToInClause(filterRequest.getShelterLocations())).append(") ").append("AND ");
        }
        if (filterRequest.getSpecies() != null && !filterRequest.getSpecies().isEmpty()) {
            sql.append("pet.pet_species IN (").append(arrayToInClause(filterRequest.getSpecies())).append(") ").append("AND ");
        }
        if (filterRequest.getBreeds() != null && !filterRequest.getBreeds().isEmpty()) {
            sql.append("pet.pet_breed IN (").append(arrayToInClause(filterRequest.getBreeds())).append(") ").append("AND ");
        }
        if (filterRequest.getHouseTraining() != null) {
            sql.append("pet.pet_house_training = ").append(filterRequest.getHouseTraining()).append(" AND ");
        }
        if (filterRequest.getSpayedNeutered() != null) {
            sql.append("pet.pet_spayed_neutered = ").append(filterRequest.getSpayedNeutered()).append(" AND ");
        }

        sql.append("pet.pet_age BETWEEN ").append(filterRequest.getMinAge()).append(" AND ").append(filterRequest.getMaxAge());

        sql.append(" LIMIT ").append(pageSize).append(" OFFSET ").append(pageSize * pageIndex);

        return jdbcTemplate.query(sql.toString(), getPetRowMapper());
    }

    public FilterRequest getFilterAbleData() {
        List<String> species = jdbcTemplate.queryForList("SELECT DISTINCT pet_species FROM pet", String.class);
        List<String> breeds = jdbcTemplate.queryForList("SELECT DISTINCT pet_breed FROM pet", String.class);
        List<String> shelterLocations = jdbcTemplate.queryForList("SELECT DISTINCT shelter_location FROM pet INNER JOIN shelter ON pet.shelter_id " +
                "= shelter.shelter_id;", String.class);
        int minAge = jdbcTemplate.queryForObject("SELECT min(pet_age) FROM pet", Integer.class);
        int maxAge = jdbcTemplate.queryForObject("SELECT max(pet_age) FROM pet", Integer.class);

        return FilterRequest.builder().species(species).breeds(breeds).shelterLocations(shelterLocations).minAge(minAge).maxAge(maxAge).build();
    }

    public List<Pet> findByStaffId(long id) {
        String sql = "Select pet_id, pet.shelter_id, adopter_id, pet_name, pet_species, pet_breed, pet_age, pet_gender," +
                " pet_health_status, pet_behaviour, pet_description, pet_house_training, pet_spayed_neutered" +
                " from pet, staff_member_shelter as sms where sms.shelter_id = pet.shelter_id" +
                " and sms.staff_id = " + id + ";";
        return jdbcTemplate.query(sql, getPetRowMapper());
    }

    private String arrayToInClause(List<String> values) {
        return "'" + String.join("', '", values) + "'";
    }

    private RowMapper<Pet> getPetRowMapper() {
        return (rs, rowNum) -> Pet.builder()
                .id(rs.getLong("pet_id"))
                .shelterId(rs.getLong("shelter_id"))
                .name(rs.getString("pet_name"))
                .species(rs.getString("pet_species"))
                .breed(rs.getString("pet_breed"))
                .age(rs.getInt("pet_age"))
                .gender(Gender.valueOf(rs.getString("pet_gender")))
                .healthStatus(rs.getString("pet_health_status"))
                .behaviour(rs.getString("pet_behaviour"))
                .description(rs.getString("pet_description"))
                .houseTraining(rs.getBoolean("pet_house_training"))
                .spayedNeutered(rs.getBoolean("pet_spayed_neutered"))
                .build();
    }
}
