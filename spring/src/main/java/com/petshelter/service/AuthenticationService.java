package com.petshelter.service;

import com.petshelter.model.Adopter;
import com.petshelter.model.StaffMember;
import com.petshelter.model.requests.LoginRequest;
import com.petshelter.model.requests.SignUpRequest;
import com.petshelter.model.responses.SignUpResponse;
import com.petshelter.repo.AdopterRepo;
import com.petshelter.repo.StaffMemberRepo;
import com.petshelter.validator.PasswordSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private final AdopterRepo adopterRepo;
    private final StaffMemberRepo staffMemberRepo;
    private final PasswordSecurity passwordSecurity;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationService(AdopterRepo adopterRepo, StaffMemberRepo staffMemberRepo,
                                 PasswordSecurity passwordSecurity, JwtService jwtService) {
        this.adopterRepo = adopterRepo;
        this.staffMemberRepo = staffMemberRepo;
        this.passwordSecurity = passwordSecurity;
        this.jwtService = jwtService;
    }

    private boolean attributesOutOfBounds(SignUpRequest signUpRequest) {
        return signUpRequest.getName().length() > 45 || signUpRequest.getPhone().length() > 11 ||
                signUpRequest.getEmail().length() > 45 || signUpRequest.getPassword().length() > 45;
    }

    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        if (attributesOutOfBounds(signUpRequest))
            return new SignUpResponse("Attributes out of bounds", false);
        
        String userType = signUpRequest.getUserType();
        Adopter adopter = adopterRepo.findByEmail(signUpRequest.getEmail());
        StaffMember staffMember = staffMemberRepo.findByEmail(signUpRequest.getEmail());

        if (adopter != null || staffMember != null)
            return new SignUpResponse("This email already registered", false);

        String passwordSalt = passwordSecurity.getNextSalt();
        String passwordHash = passwordSecurity.hashPassword(signUpRequest.getPassword(), passwordSalt);

        if (userType.equals("ADOPTER"))
            adopterRepo.save(signUpRequest, passwordSalt, passwordHash);
        else
            staffMemberRepo.save(signUpRequest, passwordSalt, passwordHash);

        return new SignUpResponse("Account Created Successfully", true);
    }

    public String login(LoginRequest loginRequest) {
        Adopter adopter = adopterRepo.findByEmail(loginRequest.getEmail());
        StaffMember staffMember = staffMemberRepo.findByEmail(loginRequest.getEmail());
        if (adopter == null && staffMember == null) return null;

        String token;
        Map<String, Object> extraClaims = new HashMap<>();
        if (adopter != null) {
            if (passwordSecurity.notExpectedPassword(loginRequest.getPassword(), adopter.getPasswordSalt(), adopter.getPasswordHash()))
                return null;
            extraClaims.put("id", adopter.getId());
            extraClaims.put("userType", "ADOPTER");
            token = jwtService.generateToken(extraClaims, adopter);
        } else {
            if (passwordSecurity.notExpectedPassword(loginRequest.getPassword(), staffMember.getPasswordSalt(), staffMember.getPasswordHash()))
                return null;
            extraClaims.put("id", staffMember.getId());
            extraClaims.put("userType", staffMember.getRole());
            token = jwtService.generateToken(extraClaims, staffMember);
        }
        return token;
    }
}