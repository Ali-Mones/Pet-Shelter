package com.petshelter.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class PasswordSecurity {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordSecurity(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String getNextSalt() {
        int length = 8;

        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < length; i++) {
            char randomChar = generateRandomChar(random);
            stringBuilder.append(randomChar);
        }

        return stringBuilder.toString();
    }

    private static char generateRandomChar(Random random) {
        int randomType = random.nextInt(2);
        int asciiOffset = (randomType == 0) ? 65 : 97;
        return (char) (asciiOffset + random.nextInt(26));
    }

    public String hashPassword(String password, String salt) {
        String saltedPassword = password + salt;
        return passwordEncoder.encode(saltedPassword);
    }

    public boolean notExpectedPassword(String password, String passwordSalt, String passwordHash) {
        String saltedPassword = password + passwordSalt;
        return !passwordEncoder.matches(saltedPassword, passwordHash);
    }
}
