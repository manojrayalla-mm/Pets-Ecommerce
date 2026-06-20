package com.petkingdom.config;

import com.petkingdom.model.Pet;
import com.petkingdom.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Data Initializer - Populates database with sample data on startup
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private PetService petService;
    
    @Override
    public void run(String... args) {
        // Only initialize if no pets exist
        if (petService.getAllPets().isEmpty()) {
            System.out.println("🐾 Initializing Pet Kingdom database with sample data...");
            
            // Cats
            petService.createPet(new Pet(
                "Whiskers", Pet.Category.CAT, "Persian", 2,
                new BigDecimal("450.00"),
                "Beautiful fluffy Persian cat with stunning blue eyes. Very friendly and loves to cuddle.",
                "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
                true, Pet.Gender.FEMALE, true
            ));
            
            petService.createPet(new Pet(
                "Luna", Pet.Category.CAT, "Siamese", 1,
                new BigDecimal("380.00"),
                "Elegant Siamese kitten with distinctive markings. Playful and intelligent.",
                "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
                true, Pet.Gender.FEMALE, true
            ));
            
            petService.createPet(new Pet(
                "Milo", Pet.Category.CAT, "British Shorthair", 3,
                new BigDecimal("520.00"),
                "Calm and gentle British Shorthair. Perfect for families with children.",
                "https://images.unsplash.com/photo-1573865526739-10659fec780d?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Bella", Pet.Category.CAT, "Maine Coon", 2,
                new BigDecimal("680.00"),
                "Majestic Maine Coon with luxurious fur. Known as gentle giants.",
                "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400",
                false, Pet.Gender.FEMALE, true
            ));
            
            // Dogs
            petService.createPet(new Pet(
                "Max", Pet.Category.DOG, "Golden Retriever", 2,
                new BigDecimal("850.00"),
                "Friendly and loyal Golden Retriever. Great with kids and other pets.",
                "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Charlie", Pet.Category.DOG, "Labrador", 1,
                new BigDecimal("780.00"),
                "Energetic Labrador puppy. Loves to play fetch and swim.",
                "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Daisy", Pet.Category.DOG, "Beagle", 2,
                new BigDecimal("620.00"),
                "Curious and friendly Beagle. Excellent hunting companion and family pet.",
                "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400",
                true, Pet.Gender.FEMALE, true
            ));
            
            petService.createPet(new Pet(
                "Rocky", Pet.Category.DOG, "German Shepherd", 3,
                new BigDecimal("950.00"),
                "Intelligent and protective German Shepherd. Excellent guard dog.",
                "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Coco", Pet.Category.DOG, "Poodle", 1,
                new BigDecimal("720.00"),
                "Elegant and smart Poodle. Hypoallergenic coat, perfect for allergy sufferers.",
                "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400",
                false, Pet.Gender.FEMALE, true
            ));
            
            // Fishes
            petService.createPet(new Pet(
                "Nemo", Pet.Category.FISH, "Clownfish", 1,
                new BigDecimal("45.00"),
                "Vibrant orange Clownfish. Perfect for saltwater aquariums.",
                "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400",
                true, Pet.Gender.MALE, false
            ));
            
            petService.createPet(new Pet(
                "Goldie", Pet.Category.FISH, "Goldfish", 1,
                new BigDecimal("15.00"),
                "Classic Goldfish with beautiful flowing fins. Easy to care for.",
                "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400",
                true, Pet.Gender.FEMALE, false
            ));
            
            petService.createPet(new Pet(
                "Azure", Pet.Category.FISH, "Betta", 1,
                new BigDecimal("35.00"),
                "Stunning blue Betta fish with flowing fins. Low maintenance pet.",
                "https://images.unsplash.com/photo-1534575180458-64e188e7e412?w=400",
                true, Pet.Gender.MALE, false
            ));
            
            petService.createPet(new Pet(
                "Coral", Pet.Category.FISH, "Angelfish", 2,
                new BigDecimal("55.00"),
                "Elegant Angelfish with striking patterns. Great for community tanks.",
                "https://images.unsplash.com/photo-1520302630591-a6e1029291f4?w=400",
                true, Pet.Gender.FEMALE, false
            ));
            
            // Rabbits
            petService.createPet(new Pet(
                "Snowball", Pet.Category.RABBIT, "Holland Lop", 1,
                new BigDecimal("180.00"),
                "Adorable Holland Lop with floppy ears. Gentle and affectionate.",
                "https://images.unsplash.com/photo-1585110396065-88308077484f?w=400",
                true, Pet.Gender.FEMALE, true
            ));
            
            petService.createPet(new Pet(
                "Thumper", Pet.Category.RABBIT, "Mini Rex", 2,
                new BigDecimal("220.00"),
                "Soft velvety Mini Rex rabbit. Calm temperament, great for beginners.",
                "https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Pepper", Pet.Category.RABBIT, "Netherland Dwarf", 1,
                new BigDecimal("250.00"),
                "Tiny Netherland Dwarf with big personality. Perfect for small spaces.",
                "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
                true, Pet.Gender.MALE, true
            ));
            
            petService.createPet(new Pet(
                "Cinnamon", Pet.Category.RABBIT, "Lionhead", 2,
                new BigDecimal("280.00"),
                "Fluffy Lionhead rabbit with magnificent mane. Friendly and social.",
                "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=400",
                false, Pet.Gender.FEMALE, true
            ));
            
            System.out.println("✅ Sample data initialized successfully!");
            System.out.println("📊 Total pets: " + petService.getAllPets().size());
        } else {
            System.out.println("ℹ️ Database already contains data. Skipping initialization.");
        }
    }
}
