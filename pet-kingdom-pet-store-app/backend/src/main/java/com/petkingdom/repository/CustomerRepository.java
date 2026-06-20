package com.petkingdom.repository;

import com.petkingdom.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

/**
 * Customer Repository - Data Access Layer for Customer Entity
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    /**
     * Find customer by email
     */
    Optional<Customer> findByEmail(String email);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find customers by city
     */
    List<Customer> findByCity(String city);
    
    /**
     * Search customers by name
     */
    List<Customer> findByNameContainingIgnoreCase(String name);
}
