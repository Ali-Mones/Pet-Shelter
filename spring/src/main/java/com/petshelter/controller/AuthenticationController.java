package com.petshelter.controller;

import com.petshelter.model.requests.LoginRequest;
import com.petshelter.model.requests.SignUpRequest;
import com.petshelter.model.responses.LoginResponse;
import com.petshelter.model.responses.SignUpResponse;
import com.petshelter.service.AuthenticationService;
import com.petshelter.service.JwtService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        SignUpResponse signUpResponse = authenticationService.signUp(signUpRequest);
        return ResponseEntity.ok(signUpResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        String token = authenticationService.login(loginRequest);
        if(token != null) {
            LoginResponse loginResponse = new LoginResponse(token,true);
            System.out.println(token);
            return ResponseEntity.ok(loginResponse);
        }
        else{
            return ResponseEntity.ok(new LoginResponse("no token",false));
        }
    }

    @GetMapping("/role")
    public String role(HttpServletRequest request) {
        return jwtService.extractUserType(jwtService.token(request));
    }
}