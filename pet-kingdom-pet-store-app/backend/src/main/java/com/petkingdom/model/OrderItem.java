package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * OrderItem Entity - Represents an item in an order
 */
@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    // Constructors
    public OrderItem() {}
    
    public OrderItem(Pet pet, Integer quantity, BigDecimal price) {
        this.pet = pet;
        this.quantity = quantity;
        this.price = price;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    
    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", pet='" + (pet != null ? pet.getName() : "null") + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
