package com.petkingdom.repository;

import com.petkingdom.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Pet Repository - Data Access Layer for Pet Entity
 */
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    /**
     * Find all available pets
     */
    List<Pet> findByAvailableTrue();
    
    /**
     * Find pets by category
     */
    List<Pet> findByCategory(Pet.Category category);
    
    /**
     * Find available pets by category
     */
    List<Pet> findByAvailableTrueAndCategory(Pet.Category category);
    
    /**
     * Search pets by name (case insensitive)
     */
    @Query("SELECT p FROM Pet p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Pet> searchByName(@Param("name") String name);
    
    /**
     * Find pets within a price range
     */
    List<Pet> findByPriceBetweenOrderByPriceAsc(BigDecimal minPrice, BigDecimal maxPrice);
    
    /**
     * Find all vaccinated pets
     */
    List<Pet> findByVaccinatedTrue();
    
    /**
     * Count pets by category
     */
    long countByCategory(Pet.Category category);
    
    /**
     * Count available pets
     */
    long countByAvailableTrue();
}
