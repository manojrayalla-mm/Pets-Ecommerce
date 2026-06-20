package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Order Entity - Represents a customer order
 */
@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
    
    /**
     * Order Status Enum
     */
    public enum OrderStatus {
        PENDING("Pending", "⏳"),
        CONFIRMED("Confirmed", "✓"),
        SHIPPED("Shipped", "📦"),
        DELIVERED("Delivered", "✅");
        
        private final String displayName;
        private final String emoji;
        
        OrderStatus(String displayName, String emoji) {
            this.displayName = displayName;
            this.emoji = emoji;
        }
        
        public String getDisplayName() {
            return displayName;
        }
        
        public String getEmoji() {
            return emoji;
        }
    }
    
    // Constructors
    public Order() {}
    
    public Order(Customer customer, BigDecimal totalAmount) {
        this.customer = customer;
        this.totalAmount = totalAmount;
    }
    
    // Lifecycle callback
    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
    }
    
    // Helper methods
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
    
    public void removeItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    
    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", status=" + status +
                ", totalAmount=" + totalAmount +
                '}';
    }
}
