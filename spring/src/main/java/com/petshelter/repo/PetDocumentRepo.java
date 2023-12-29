package com.petshelter.repo;

import com.petshelter.model.PetDocument;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Data
@Repository
public class PetDocumentRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public long saveDocument(PetDocument document){

        String sql = "INSERT INTO pet_document (pet_id,documentName,document_type,document) VALUES (?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps =  connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, document.getPetId());
            ps.setString(2,document.getDocumentName());
            ps.setString(3,document.getDocumentType());
            ps.setBlob(4, document.getDocument());
            return ps;
        },keyHolder);

        return keyHolder.getKey() != null ? keyHolder.getKey().longValue() : -1;
    }

    public List<Blob> getAllDocuments(long petId) throws SQLException {
        return getFileData(petId);
    }

    private List<Blob> getFileData(Long petId) {

        String sql = "SELECT document FROM pet_document WHERE pet_id = " + petId;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            try {
                return rs.getBlob("document");
            } catch (SQLException e) {
                throw new RuntimeException("Error reading file data", e);
            }
        });
    }

}
