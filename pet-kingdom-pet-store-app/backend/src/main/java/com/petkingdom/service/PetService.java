package com.petkingdom.service;

import com.petkingdom.model.Pet;
import com.petkingdom.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Pet Service - Business Logic Layer for Pet Operations
 */
@Service
@Transactional
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    /**
     * Get all pets
     */
    @Transactional(readOnly = true)
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    /**
     * Get all available pets
     */
    @Transactional(readOnly = true)
    public List<Pet> getAvailablePets() {
        return petRepository.findByAvailableTrue();
    }
    
    /**
     * Get pets by category
     */
    @Transactional(readOnly = true)
    public List<Pet> getPetsByCategory(Pet.Category category) {
        return petRepository.findByCategory(category);
    }
    
    /**
     * Get available pets by category
     */
    @Transactional(readOnly = true)
    public List<Pet> getAvailablePetsByCategory(Pet.Category category) {
        return petRepository.findByAvailableTrueAndCategory(category);
    }
    
    /**
     * Get pet by ID
     */
    @Transactional(readOnly = true)
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    /**
     * Search pets by name
     */
    @Transactional(readOnly = true)
    public List<Pet> searchPetsByName(String name) {
        return petRepository.searchByName(name);
    }
    
    /**
     * Create a new pet
     */
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
    
    /**
     * Update an existing pet
     */
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        
        pet.setName(petDetails.getName());
        pet.setBreed(petDetails.getBreed());
        pet.setAge(petDetails.getAge());
        pet.setPrice(petDetails.getPrice());
        pet.setDescription(petDetails.getDescription());
        pet.setImageUrl(petDetails.getImageUrl());
        pet.setAvailable(petDetails.getAvailable());
        pet.setGender(petDetails.getGender());
        pet.setVaccinated(petDetails.getVaccinated());
        
        return petRepository.save(pet);
    }
    
    /**
     * Delete a pet
     */
    public void deletePet(Long id) {
        if (!petRepository.existsById(id)) {
            throw new RuntimeException("Pet not found with id: " + id);
        }
        petRepository.deleteById(id);
    }
    
    /**
     * Mark pet as sold (unavailable)
     */
    public Pet markPetAsSold(Long id) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        pet.setAvailable(false);
        return petRepository.save(pet);
    }
    
    /**
     * Get pets within price range
     */
    @Transactional(readOnly = true)
    public List<Pet> getPetsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return petRepository.findByPriceBetweenOrderByPriceAsc(minPrice, maxPrice);
    }
    
    /**
     * Get count of pets by category
     */
    @Transactional(readOnly = true)
    public long countPetsByCategory(Pet.Category category) {
        return petRepository.countByCategory(category);
    }
    
    /**
     * Get total count of available pets
     */
    @Transactional(readOnly = true)
    public long countAvailablePets() {
        return petRepository.countByAvailableTrue();
    }
}
