package com.petkingdom.controller;

import com.petkingdom.model.Pet;
import com.petkingdom.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Pet Controller - REST API Endpoints for Pet Operations
 */
@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    /**
     * GET /api/pets - Get all pets
     */
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        return ResponseEntity.ok(pets);
    }
    
    /**
     * GET /api/pets/available - Get all available pets
     */
    @GetMapping("/available")
    public ResponseEntity<List<Pet>> getAvailablePets() {
        List<Pet> pets = petService.getAvailablePets();
        return ResponseEntity.ok(pets);
    }
    
    /**
     * GET /api/pets/category/{category} - Get pets by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Pet>> getPetsByCategory(@PathVariable String category) {
        try {
            Pet.Category cat = Pet.Category.valueOf(category.toUpperCase());
            List<Pet> pets = petService.getPetsByCategory(cat);
            return ResponseEntity.ok(pets);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * GET /api/pets/{id} - Get pet by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET /api/pets/search?name={name} - Search pets by name
     */
    @GetMapping("/search")
    public ResponseEntity<List<Pet>> searchPets(@RequestParam String name) {
        List<Pet> pets = petService.searchPetsByName(name);
        return ResponseEntity.ok(pets);
    }
    
    /**
     * POST /api/pets - Create a new pet
     */
    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        Pet createdPet = petService.createPet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
    }
    
    /**
     * PUT /api/pets/{id} - Update an existing pet
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        try {
            Pet updatedPet = petService.updatePet(id, pet);
            return ResponseEntity.ok(updatedPet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * DELETE /api/pets/{id} - Delete a pet
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        try {
            petService.deletePet(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * PATCH /api/pets/{id}/sell - Mark pet as sold
     */
    @PatchMapping("/{id}/sell")
    public ResponseEntity<Pet> markPetAsSold(@PathVariable Long id) {
        try {
            Pet pet = petService.markPetAsSold(id);
            return ResponseEntity.ok(pet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/pets/stats - Get pet statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPetStats() {
        Map<String, Object> stats = Map.of(
            "totalPets", petService.getAllPets().size(),
            "availablePets", petService.countAvailablePets(),
            "cats", petService.countPetsByCategory(Pet.Category.CAT),
            "dogs", petService.countPetsByCategory(Pet.Category.DOG),
            "fishes", petService.countPetsByCategory(Pet.Category.FISH),
            "rabbits", petService.countPetsByCategory(Pet.Category.RABBIT)
        );
        return ResponseEntity.ok(stats);
    }
}
