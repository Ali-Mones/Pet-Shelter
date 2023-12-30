package com.petshelter.repo;

import com.petshelter.model.PetDocument;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public long saveDocument(MultipartFile document,long petId,String type,String name){

        String sql = "INSERT INTO pet_document (pet_id,document_name,document_type,document) VALUES (?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps =  connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, petId);
            ps.setString(2,name);
            ps.setString(3,type);
            try {
                ps.setBytes(4, document.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return ps;
        },keyHolder);

        return keyHolder.getKey() != null ? keyHolder.getKey().longValue() : -1;
    }

    public List<PetDocument> getAllDocuments(long petId) throws SQLException {
        return getFileData(petId);
    }

    private List<PetDocument> getFileData(Long petId) {

        String sql = "SELECT * FROM pet_document WHERE pet_id = " + petId;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            try {
                return PetDocument.builder()
                        .id(rs.getLong("document_id"))
                        .petId(rs.getLong("pet_id"))
                        .name(rs.getString("document_name"))
                        .type(rs.getString("document_type"))
                        .file(rs.getBytes("document"))
                        .build();
            } catch (SQLException e) {
                throw new RuntimeException("Error reading file data", e);
            }
        });
    }

}
