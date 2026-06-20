# Pet Kingdom - Full Stack Pet Store Application

## 🏰 Overview

Pet Kingdom is a comprehensive pet store e-commerce application that allows users to browse, view details, and purchase pets from various categories including Cats, Dogs, Fishes, and Rabbits.

## 📁 Project Structure

```
Pet Kingdom/
├── Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── PetCard.tsx
│   │   │   ├── PetModal.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── CheckoutModal.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── data/
│   │   │   └── mockData.ts
│   │   ├── types/
│   │   │   └── pet.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── Backend (Java + Spring Boot + MySQL + JDBC)
    └── src/main/java/com/petkingdom/
        ├── controller/
        ├── model/
        ├── repository/
        ├── service/
        └── PetKingdomApplication.java
```

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Pet Categories**: Filter pets by Cats, Dogs, Fishes, and Rabbits
- **Pet Details Modal**: View detailed information about each pet
- **Shopping Cart**: Add/remove pets, update quantities
- **Checkout Process**: Multi-step checkout with form validation
- **Contact Form**: Get in touch with the store
- **About Section**: Learn about Pet Kingdom's mission and values

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling

### Backend (Java/Spring Boot)
- **Java 17+** - Programming Language
- **Spring Boot 3.x** - Application Framework
- **Spring Data JPA** - Database ORM
- **MySQL** - Database
- **JDBC** - Database Connectivity
- **Spring Security** - Authentication & Authorization
- **REST API** - Web Services

## 🚀 Running the Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Backend Setup (Java/Spring Boot + MySQL)

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.8+

### Database Setup

```sql
-- Create Database
CREATE DATABASE pet_kingdom;
USE pet_kingdom;

-- Create Pets Table
CREATE TABLE pets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category ENUM('cat', 'dog', 'fish', 'rabbit') NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    gender ENUM('male', 'female') NOT NULL,
    vaccinated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Customers Table
CREATE TABLE customers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(500),
    city VARCHAR(100),
    zip_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Create Order Items Table
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- Insert Sample Data
INSERT INTO pets (name, category, breed, age, price, description, image_url, available, gender, vaccinated) VALUES
('Whiskers', 'cat', 'Persian', 2, 450.00, 'Beautiful fluffy Persian cat with stunning blue eyes', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', TRUE, 'female', TRUE),
('Luna', 'cat', 'Siamese', 1, 380.00, 'Elegant Siamese kitten with distinctive markings', 'https://images.unsplash.com/photo-1513245543132-31f507417b26', TRUE, 'female', TRUE),
('Max', 'dog', 'Golden Retriever', 2, 850.00, 'Friendly and loyal Golden Retriever', 'https://images.unsplash.com/photo-1552053831-71594a27632d', TRUE, 'male', TRUE),
('Charlie', 'dog', 'Labrador', 1, 780.00, 'Energetic Labrador puppy', 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6', TRUE, 'male', TRUE),
('Nemo', 'fish', 'Clownfish', 1, 45.00, 'Vibrant orange Clownfish', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5', TRUE, 'male', FALSE),
('Snowball', 'rabbit', 'Holland Lop', 1, 180.00, 'Adorable Holland Lop with floppy ears', 'https://images.unsplash.com/photo-1585110396065-88308077484f', TRUE, 'female', TRUE);
```

### Application Properties (application.properties)

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/pet_kingdom?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Application Name
spring.application.name=pet-kingdom
```

### Backend Java Code

#### 1. Pet Model (model/Pet.java)

```java
package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;
    
    @Column(nullable = false)
    private String breed;
    
    @Column(nullable = false)
    private Integer age;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "image_url")
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
    
    public enum Category {
        CAT, DOG, FISH, RABBIT
    }
    
    public enum Gender {
        MALE, FEMALE
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
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

#### 2. Pet Repository (repository/PetRepository.java)

```java
package com.petkingdom.repository;

import com.petkingdom.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    List<Pet> findByAvailableTrue();
    
    List<Pet> findByCategory(Pet.Category category);
    
    List<Pet> findByAvailableTrueAndCategory(Pet.Category category);
    
    @Query("SELECT p FROM Pet p WHERE p.name LIKE %:name%")
    List<Pet> searchByName(@Param("name") String name);
    
    List<Pet> findByPriceBetweenOrderByPriceAsc(java.math.BigDecimal minPrice, java.math.BigDecimal maxPrice);
}
```

#### 3. Pet Service (service/PetService.java)

```java
package com.petkingdom.service;

import com.petkingdom.model.Pet;
import com.petkingdom.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    public List<Pet> getAvailablePets() {
        return petRepository.findByAvailableTrue();
    }
    
    public List<Pet> getPetsByCategory(Pet.Category category) {
        return petRepository.findByCategory(category);
    }
    
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
    
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pet not found"));
        
        pet.setName(petDetails.getName());
        pet.setBreed(petDetails.getBreed());
        pet.setAge(petDetails.getAge());
        pet.setPrice(petDetails.getPrice());
        pet.setDescription(petDetails.getDescription());
        pet.setAvailable(petDetails.getAvailable());
        pet.setVaccinated(petDetails.getVaccinated());
        
        return petRepository.save(pet);
    }
    
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
```

#### 4. Pet Controller (controller/PetController.java)

```java
package com.petkingdom.controller;

import com.petkingdom.model.Pet;
import com.petkingdom.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Pet>> getAvailablePets() {
        return ResponseEntity.ok(petService.getAvailablePets());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Pet>> getPetsByCategory(@PathVariable String category) {
        Pet.Category cat = Pet.Category.valueOf(category.toUpperCase());
        return ResponseEntity.ok(petService.getPetsByCategory(cat));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        return ResponseEntity.ok(petService.createPet(pet));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        try {
            return ResponseEntity.ok(petService.updatePet(id, pet));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.ok().build();
    }
}
```

#### 5. Customer Model (model/Customer.java)

```java
package com.petkingdom.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String phone;
    private String address;
    private String city;
    
    @Column(name = "zip_code")
    private String zipCode;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
```

#### 6. Order Model (model/Order.java)

```java
package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
    
    public enum OrderStatus {
        PENDING, CONFIRMED, SHIPPED, DELIVERED
    }
    
    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
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
    
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
```

#### 7. Order Item Model (model/OrderItem.java)

```java
package com.petkingdom.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

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
    
    @Column(nullable = false)
    private BigDecimal price;
    
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
}
```

#### 8. Main Application (PetKingdomApplication.java)

```java
package com.petkingdom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetKingdomApplication {
    public static void main(String[] args) {
        SpringApplication.run(PetKingdomApplication.class, args);
    }
}
```

#### 9. pom.xml Dependencies

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.petkingdom</groupId>
    <artifactId>pet-kingdom</artifactId>
    <version>1.0.0</version>
    <name>Pet Kingdom</name>
    <description>Pet Store Application</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot Starter Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Boot Starter Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Lombok (Optional) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/pets | Get all pets |
| GET | /api/pets/available | Get available pets |
| GET | /api/pets/category/{category} | Get pets by category |
| GET | /api/pets/{id} | Get pet by ID |
| POST | /api/pets | Create new pet |
| PUT | /api/pets/{id} | Update pet |
| DELETE | /api/pets/{id} | Delete pet |
| POST | /api/orders | Create new order |
| GET | /api/orders | Get all orders |
| GET | /api/orders/{id} | Get order by ID |

## 📱 Frontend-Backend Integration

To connect the React frontend with the Spring Boot backend, update the API calls in the frontend:

```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

export const fetchPets = async () => {
  const response = await fetch(`${API_BASE_URL}/pets`);
  return response.json();
};

export const fetchPetsByCategory = async (category: string) => {
  const response = await fetch(`${API_BASE_URL}/pets/category/${category}`);
  return response.json();
};

export const createOrder = async (orderData: any) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};
```

## 🎯 Running the Complete Application

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📸 Screenshots

The application includes:
- Beautiful hero section with animated elements
- Pet category filtering
- Detailed pet cards with images
- Shopping cart functionality
- Multi-step checkout process
- Contact form
- About section with company values
- Responsive footer

## 👨‍💻 Author

Pet Kingdom Development Team

## 📄 License

MIT License
