-- ===================================
-- Pet Kingdom Database Schema
-- ===================================

-- Create Database
CREATE DATABASE IF NOT EXISTS pet_kingdom;
USE pet_kingdom;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS customers;

-- Create Pets Table
CREATE TABLE pets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('CAT', 'DOG', 'FISH', 'RABBIT') NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    vaccinated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_available (available),
    INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Customers Table
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(500),
    city VARCHAR(100),
    zip_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Orders Table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED') DEFAULT 'PENDING',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_order_date (order_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Order Items Table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    pet_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_pet_id (pet_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data
INSERT INTO pets (name, category, breed, age, price, description, image_url, available, gender, vaccinated) VALUES
('Whiskers', 'CAT', 'Persian', 2, 450.00, 'Beautiful fluffy Persian cat with stunning blue eyes. Very friendly and loves to cuddle.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', TRUE, 'FEMALE', TRUE),
('Luna', 'CAT', 'Siamese', 1, 380.00, 'Elegant Siamese kitten with distinctive markings. Playful and intelligent.', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400', TRUE, 'FEMALE', TRUE),
('Milo', 'CAT', 'British Shorthair', 3, 520.00, 'Calm and gentle British Shorthair. Perfect for families with children.', 'https://images.unsplash.com/photo-1573865526739-10659fec780d?w=400', TRUE, 'MALE', TRUE),
('Bella', 'CAT', 'Maine Coon', 2, 680.00, 'Majestic Maine Coon with luxurious fur. Known as gentle giants.', 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', FALSE, 'FEMALE', TRUE),
('Max', 'DOG', 'Golden Retriever', 2, 850.00, 'Friendly and loyal Golden Retriever. Great with kids and other pets.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', TRUE, 'MALE', TRUE),
('Charlie', 'DOG', 'Labrador', 1, 780.00, 'Energetic Labrador puppy. Loves to play fetch and swim.', 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=400', TRUE, 'MALE', TRUE),
('Daisy', 'DOG', 'Beagle', 2, 620.00, 'Curious and friendly Beagle. Excellent hunting companion and family pet.', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400', TRUE, 'FEMALE', TRUE),
('Rocky', 'DOG', 'German Shepherd', 3, 950.00, 'Intelligent and protective German Shepherd. Excellent guard dog.', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400', TRUE, 'MALE', TRUE),
('Coco', 'DOG', 'Poodle', 1, 720.00, 'Elegant and smart Poodle. Hypoallergenic coat, perfect for allergy sufferers.', 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400', FALSE, 'FEMALE', TRUE),
('Nemo', 'FISH', 'Clownfish', 1, 45.00, 'Vibrant orange Clownfish. Perfect for saltwater aquariums.', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400', TRUE, 'MALE', FALSE),
('Goldie', 'FISH', 'Goldfish', 1, 15.00, 'Classic Goldfish with beautiful flowing fins. Easy to care for.', 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400', TRUE, 'FEMALE', FALSE),
('Azure', 'FISH', 'Betta', 1, 35.00, 'Stunning blue Betta fish with flowing fins. Low maintenance pet.', 'https://images.unsplash.com/photo-1534575180458-64e188e7e412?w=400', TRUE, 'MALE', FALSE),
('Coral', 'FISH', 'Angelfish', 2, 55.00, 'Elegant Angelfish with striking patterns. Great for community tanks.', 'https://images.unsplash.com/photo-1520302630591-a6e1029291f4?w=400', TRUE, 'FEMALE', FALSE),
('Snowball', 'RABBIT', 'Holland Lop', 1, 180.00, 'Adorable Holland Lop with floppy ears. Gentle and affectionate.', 'https://images.unsplash.com/photo-1585110396065-88308077484f?w=400', TRUE, 'FEMALE', TRUE),
('Thumper', 'RABBIT', 'Mini Rex', 2, 220.00, 'Soft velvety Mini Rex rabbit. Calm temperament, great for beginners.', 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400', TRUE, 'MALE', TRUE),
('Pepper', 'RABBIT', 'Netherland Dwarf', 1, 250.00, 'Tiny Netherland Dwarf with big personality. Perfect for small spaces.', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', TRUE, 'MALE', TRUE),
('Cinnamon', 'RABBIT', 'Lionhead', 2, 280.00, 'Fluffy Lionhead rabbit with magnificent mane. Friendly and social.', 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?w=400', FALSE, 'FEMALE', TRUE);

-- Sample Customer
INSERT INTO customers (name, email, phone, address, city, zip_code) VALUES
('John Doe', 'john.doe@example.com', '+1-555-123-4567', '123 Main Street, Apt 4B', 'New York', '10001');

-- Verify data
SELECT 'Pets Count: ' AS Info, COUNT(*) AS Count FROM pets
UNION ALL
SELECT 'Customers Count: ', COUNT(*) FROM customers;
