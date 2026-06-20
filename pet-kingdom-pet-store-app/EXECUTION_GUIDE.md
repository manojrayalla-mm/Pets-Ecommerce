# 🎯 Pet Kingdom - Complete Execution Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Files Created](#files-created)
3. [Frontend Execution](#frontend-execution)
4. [Backend Execution](#backend-execution)
5. [Database Setup](#database-setup)
6. [Testing the Application](#testing-the-application)
7. [API Testing](#api-testing)
8. [Troubleshooting](#troubleshooting)

---

## 🏰 Project Overview

**Pet Kingdom** is a complete full-stack pet store application with:
- **Frontend**: React 18 + Vite + Tailwind CSS + TypeScript
- **Backend**: Java 17 + Spring Boot 3.2 + MySQL + JPA
- **Features**: Pet catalog, shopping cart, checkout, contact form

---

## 📁 Files Created

### Frontend Files (19 files)
```
src/
├── App.tsx                      # Main application component
├── main.tsx                     # Entry point
├── index.css                    # Tailwind CSS imports
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Hero.tsx                # Hero section
│   ├── CategoryFilter.tsx      # Category buttons
│   ├── PetCard.tsx             # Pet display card
│   ├── PetModal.tsx            # Pet details modal
│   ├── Cart.tsx                # Shopping cart
│   ├── CheckoutModal.tsx       # Checkout process
│   ├── About.tsx               # About section
│   ├── Contact.tsx             # Contact form
│   └── Footer.tsx              # Site footer
├── data/
│   └── mockData.ts             # Sample pet data
└── types/
    └── pet.ts                  # TypeScript interfaces
```

### Backend Files (16 files)
```
backend/
├── pom.xml                                          # Maven config
└── src/main/
    ├── java/com/petkingdom/
    │   ├── PetKingdomApplication.java              # Main class
    │   ├── config/
    │   │   ├── WebConfig.java                      # CORS config
    │   │   └── DataInitializer.java                # Sample data
    │   ├── controller/
    │   │   ├── PetController.java                  # Pet endpoints
    │   │   ├── CustomerController.java             # Customer endpoints
    │   │   └── OrderController.java                # Order endpoints
    │   ├── model/
    │   │   ├── Pet.java                            # Pet entity
    │   │   ├── Customer.java                       # Customer entity
    │   │   ├── Order.java                          # Order entity
    │   │   └── OrderItem.java                      # Order item entity
    │   ├── repository/
    │   │   ├── PetRepository.java                  # Pet DAO
    │   │   ├── CustomerRepository.java             # Customer DAO
    │   │   └── OrderRepository.java                # Order DAO
    │   └── service/
    │       ├── PetService.java                     # Pet business logic
    │       ├── CustomerService.java                # Customer logic
    │       └── OrderService.java                   # Order logic
    └── resources/
        ├── application.properties                   # App config
        └── schema.sql                               # Database schema
```

### Documentation Files (4 files)
```
├── README.md               # Complete documentation
├── QUICKSTART.md          # Quick start guide
├── PROJECT_SUMMARY.md     # Project summary
└── EXECUTION_GUIDE.md     # This file
```

---

## 🚀 Frontend Execution

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Access Application
Open your browser and navigate to:
```
http://localhost:5173
```

### Available npm Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Frontend Features to Test
1. ✅ Browse all pets (17 pets across 4 categories)
2. ✅ Filter by category (Cats, Dogs, Fishes, Rabbits)
3. ✅ View pet details (click "View Details")
4. ✅ Add pets to cart (click "Add to Cart")
5. ✅ View cart (click cart icon)
6. ✅ Update quantities (+/- buttons)
7. ✅ Remove items (trash icon)
8. ✅ Checkout process (multi-step)
9. ✅ Contact form
10. ✅ Responsive design (resize browser)

---

## ☕ Backend Execution

### Prerequisites Check
```bash
# Check Java version (need 17+)
java -version

# Check Maven version
mvn -version

# Check MySQL version
mysql --version
```

### Step 1: Setup MySQL Database

#### Option A: Using schema.sql
```bash
# Login to MySQL
mysql -u root -p

# Execute schema file
source /path/to/backend/src/main/resources/schema.sql

# Verify data
USE pet_kingdom;
SELECT COUNT(*) FROM pets;
```

#### Option B: Manual Setup
```sql
CREATE DATABASE pet_kingdom;
USE pet_kingdom;

-- Copy and paste SQL from schema.sql
```

### Step 2: Configure Database Connection

Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pet_kingdom?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Run Backend Application

#### Option A: Using Maven
```bash
cd backend
mvn spring-boot:run
```

#### Option B: Build JAR and Run
```bash
cd backend
mvn clean package
java -jar target/pet-kingdom-1.0.0.jar
```

### Step 4: Verify Backend is Running

Check console output for:
```
👑 Pet Kingdom Application Started Successfully!
🐾 Access the API at: http://localhost:8080/api
```

---

## 🗄️ Database Setup

### MySQL Configuration
```sql
-- Database: pet_kingdom
-- Tables: pets, customers, orders, order_items
-- Sample Data: 17 pets, 1 customer
```

### Verify Database
```sql
USE pet_kingdom;

-- Check pets
SELECT category, COUNT(*) as count FROM pets GROUP BY category;

-- Expected output:
-- CAT: 4
-- DOG: 5
-- FISH: 4
-- RABBIT: 4
```

---

## 🧪 Testing the Application

### Complete Testing Workflow

#### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

Wait for: `Tomcat started on port(s): 8080`

#### 2. Start Frontend (new terminal)
```bash
npm run dev
```

Wait for: `Local: http://localhost:5173/`

#### 3. Test Frontend Features
1. Open http://localhost:5173
2. Scroll through hero section
3. Filter pets by category
4. Click on a pet card
5. Add pet to cart
6. Open cart and verify
7. Proceed to checkout
8. Fill out checkout form
9. Complete order

#### 4. Test Backend API
Open new terminal and run:

```bash
# Test Pets API
curl http://localhost:8080/api/pets | jq

# Test Available Pets
curl http://localhost:8080/api/pets/available | jq '.length'

# Test Category Filter
curl http://localhost:8080/api/pets/category/dog | jq

# Test Search
curl "http://localhost:8080/api/pets/search?name=max" | jq

# Test Stats
curl http://localhost:8080/api/pets/stats | jq
```

---

## 🔌 API Testing

### Using cURL

#### Get All Pets
```bash
curl -X GET http://localhost:8080/api/pets
```

#### Get Pet by ID
```bash
curl -X GET http://localhost:8080/api/pets/1
```

#### Create New Pet
```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fluffy",
    "category": "CAT",
    "breed": "Persian",
    "age": 2,
    "price": 500.00,
    "description": "A cute Persian cat",
    "gender": "FEMALE",
    "vaccinated": true,
    "available": true
  }'
```

#### Update Pet
```bash
curl -X PUT http://localhost:8080/api/pets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Whiskers Updated",
    "price": 475.00
  }'
```

#### Delete Pet
```bash
curl -X DELETE http://localhost:8080/api/pets/1
```

#### Create Order
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "id": 1
    },
    "items": [
      {
        "pet": {"id": 1},
        "quantity": 1
      }
    ]
  }'
```

### Using Postman

Import these endpoints:
```
Base URL: http://localhost:8080/api

GET    /pets
GET    /pets/available
GET    /pets/category/dog
GET    /pets/{id}
POST   /pets
PUT    /pets/{id}
DELETE /pets/{id}

GET    /orders
POST   /orders
PATCH  /orders/{id}/confirm

GET    /customers
POST   /customers
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Error: Port 5173 already in use**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill

# Or use different port
npm run dev -- --port 3000
```

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build fails**
```bash
# Clean build
npm run build -- --force
```

### Backend Issues

**Error: MySQL connection refused**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL
sudo systemctl start mysql

# Verify connection
mysql -u root -p -e "SHOW DATABASES;"
```

**Error: Port 8080 already in use**
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

**Error: Database not found**
```sql
-- Create database
CREATE DATABASE pet_kingdom;

-- Run schema
source backend/src/main/resources/schema.sql
```

**Maven build fails**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests
mvn clean install -DskipTests
```

### CORS Issues

**Error: Access-Control-Allow-Origin**

Ensure WebConfig.java is properly configured:
```java
config.addAllowedOriginPattern("*");
```

Or update for production:
```java
config.addAllowedOrigin("http://localhost:5173");
```

---

## 📊 Expected Output

### Frontend Console
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Backend Console
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot :: v3.2.0

👑 Pet Kingdom Application Started Successfully!
🐾 Access the API at: http://localhost:8080/api
```

### Database Verification
```sql
mysql> SELECT category, COUNT(*) FROM pets GROUP BY category;
+----------+----------+
| category | COUNT(*) |
+----------+----------+
| CAT      |        4 |
| DOG      |        5 |
| FISH     |        4 |
| RABBIT   |        4 |
+----------+----------+
```

---

## ✅ Success Checklist

- [ ] MySQL database created
- [ ] Schema executed successfully
- [ ] Backend starts without errors
- [ ] API endpoints respond correctly
- [ ] Frontend builds successfully
- [ ] Frontend loads in browser
- [ ] Pets display correctly
- [ ] Category filtering works
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Contact form submits
- [ ] Responsive design works

---

## 🎉 You're Ready!

Your Pet Kingdom application is now fully set up and ready to use!

### Quick Access Links
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **API Docs**: See README.md for endpoint details

### Next Steps
1. Customize the UI colors and branding
2. Add more pets to the database
3. Implement user authentication
4. Add payment processing
5. Deploy to production server

---

**Happy Coding! 🐾👑**

For detailed documentation, see:
- README.md - Complete guide
- QUICKSTART.md - Quick start
- PROJECT_SUMMARY.md - Project overview
