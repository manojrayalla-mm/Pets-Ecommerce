package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Pet Entity - Represents a pet available in the store
 */
@Entity
@Table(name = "pets")
public class Pet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;
    
    @Column(nullable = false, length = 100)
    private String breed;
    
    @Column(nullable = false)
    private Integer age;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Column(nullable = false)
    private Boolean vaccinated = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    /**
     * Pet Category Enum
     */
    public enum Category {
        CAT("Cat", "🐱"),
        DOG("Dog", "🐕"),
        FISH("Fish", "🐠"),
        RABBIT("Rabbit", "🐰");
        
        private final String displayName;
        private final String emoji;
        
        Category(String displayName, String emoji) {
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
    
    /**
     * Gender Enum
     */
    public enum Gender {
        MALE("Male", "♂️"),
        FEMALE("Female", "♀️");
        
        private final String displayName;
        private final String symbol;
        
        Gender(String displayName, String symbol) {
            this.displayName = displayName;
            this.symbol = symbol;
        }
        
        public String getDisplayName() {
            return displayName;
        }
        
        public String getSymbol() {
            return symbol;
        }
    }
    
    // Constructors
    public Pet() {}
    
    public Pet(String name, Category category, String breed, Integer age, 
               BigDecimal price, String description, String imageUrl, 
               Boolean available, Gender gender, Boolean vaccinated) {
        this.name = name;
        this.category = category;
        this.breed = breed;
        this.age = age;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.available = available;
        this.gender = gender;
        this.vaccinated = vaccinated;
    }
    
    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    
    public Boolean getVaccinated() { return vaccinated; }
    public void setVaccinated(Boolean vaccinated) { this.vaccinated = vaccinated; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", breed='" + breed + '\'' +
                ", price=" + price +
                ", available=" + available +
                '}';
    }
}
