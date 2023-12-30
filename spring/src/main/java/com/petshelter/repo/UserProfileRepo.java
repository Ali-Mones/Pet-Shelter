package com.petshelter.repo;

import com.petshelter.model.UserProfile;
import com.petshelter.model.requests.SignUpRequest;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepo {
    UserProfile findByEmail(String email);

    Long save(SignUpRequest signUpRequest, String passwordSalt, String passwordHash);
}