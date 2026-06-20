package com.petkingdom.repository;

import com.petkingdom.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Order Repository - Data Access Layer for Order Entity
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    /**
     * Find orders by customer ID
     */
    List<Order> findByCustomerId(Long customerId);
    
    /**
     * Find orders by status
     */
    List<Order> findByStatus(Order.OrderStatus status);
    
    /**
     * Find orders by date range
     */
    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    List<Order> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                                 @Param("endDate") LocalDateTime endDate);
    
    /**
     * Count orders by status
     */
    long countByStatus(Order.OrderStatus status);
    
    /**
     * Find pending orders
     */
    List<Order> findByStatusOrderByOrderDateAsc(Order.OrderStatus status);
}
