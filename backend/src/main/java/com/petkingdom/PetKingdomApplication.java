package com.petkingdom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Pet Kingdom - Main Application Class
 * A comprehensive pet store management system
 */
@SpringBootApplication
public class PetKingdomApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(PetKingdomApplication.class, args);
        System.out.println("👑 Pet Kingdom Application Started Successfully!");
        System.out.println("🐾 Access the API at: http://localhost:8080/api");
    }
}
