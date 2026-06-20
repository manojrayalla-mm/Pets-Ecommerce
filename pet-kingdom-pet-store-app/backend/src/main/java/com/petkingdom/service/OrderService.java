package com.petkingdom.service;

import com.petkingdom.model.Customer;
import com.petkingdom.model.Order;
import com.petkingdom.model.OrderItem;
import com.petkingdom.model.Pet;
import com.petkingdom.repository.OrderRepository;
import com.petkingdom.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Order Service - Business Logic Layer for Order Operations
 */
@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private CustomerService customerService;
    
    /**
     * Get all orders
     */
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    /**
     * Get order by ID
     */
    @Transactional(readOnly = true)
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    /**
     * Get orders by customer ID
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    /**
     * Create a new order
     */
    public Order createOrder(Order order) {
        // Validate and update pet availability
        for (OrderItem item : order.getItems()) {
            Pet pet = petRepository.findById(item.getPet().getId())
                .orElseThrow(() -> new RuntimeException("Pet not found: " + item.getPet().getId()));
            
            if (!pet.getAvailable()) {
                throw new RuntimeException("Pet not available: " + pet.getName());
            }
            
            // Mark pet as sold
            pet.setAvailable(false);
            petRepository.save(pet);
            
            // Set the actual pet and price in the order item
            item.setPet(pet);
            item.setPrice(pet.getPrice());
        }
        
        // Calculate total amount
        BigDecimal total = order.getItems().stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        order.setTotalAmount(total);
        order.setStatus(Order.OrderStatus.PENDING);
        
        return orderRepository.save(order);
    }
    
    /**
     * Update order status
     */
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        order.setStatus(status);
        return orderRepository.save(order);
    }
    
    /**
     * Confirm an order
     */
    public Order confirmOrder(Long orderId) {
        return updateOrderStatus(orderId, Order.OrderStatus.CONFIRMED);
    }
    
    /**
     * Ship an order
     */
    public Order shipOrder(Long orderId) {
        return updateOrderStatus(orderId, Order.OrderStatus.SHIPPED);
    }
    
    /**
     * Mark order as delivered
     */
    public Order deliverOrder(Long orderId) {
        return updateOrderStatus(orderId, Order.OrderStatus.DELIVERED);
    }
    
    /**
     * Cancel an order (make pets available again)
     */
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        // Make pets available again
        for (OrderItem item : order.getItems()) {
            Pet pet = item.getPet();
            if (pet != null) {
                pet.setAvailable(true);
                petRepository.save(pet);
            }
        }
        
        orderRepository.delete(order);
    }
    
    /**
     * Get orders by status
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
    
    /**
     * Get pending orders
     */
    @Transactional(readOnly = true)
    public List<Order> getPendingOrders() {
        return orderRepository.findByStatusOrderByOrderDateAsc(Order.OrderStatus.PENDING);
    }
    
    /**
     * Get orders by date range
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByDateRange(startDate, endDate);
    }
}
