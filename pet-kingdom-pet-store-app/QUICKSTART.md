# 🚀 Pet Kingdom - Quick Start Guide

## Overview
Pet Kingdom is a full-stack pet store application with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Java + Spring Boot + MySQL + JDBC

---

## 📦 Frontend Setup (React)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running

```bash
# Navigate to project root
cd /path/to/pet-kingdom

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

---

## ☕ Backend Setup (Spring Boot)

### Prerequisites
- Java 17 or higher installed
- MySQL 8.0 or higher installed
- Maven 3.8+ installed

### Step 1: Configure MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database and run schema
source backend/src/main/resources/schema.sql

# Or manually:
CREATE DATABASE pet_kingdom;
USE pet_kingdom;
# Run the SQL commands from schema.sql
```

### Step 2: Configure Application Properties

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pet_kingdom?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Run the Backend

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/pet-kingdom-1.0.0.jar
```

The backend will start on `http://localhost:8080`

---

## 🔌 API Endpoints

Once the backend is running, test these endpoints:

### Pets API
```bash
# Get all pets
curl http://localhost:8080/api/pets

# Get available pets
curl http://localhost:8080/api/pets/available

# Get pets by category
curl http://localhost:8080/api/pets/category/dog

# Get specific pet
curl http://localhost:8080/api/pets/1

# Search pets
curl "http://localhost:8080/api/pets/search?name=max"
```

### Orders API
```bash
# Get all orders
curl http://localhost:8080/api/orders

# Get pending orders
curl http://localhost:8080/api/orders/pending

# Get order statistics
curl http://localhost:8080/api/orders/stats
```

### Customers API
```bash
# Get all customers
curl http://localhost:8080/api/customers

# Create customer
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+1-555-987-6543"}'
```

---

## 🎨 Frontend Features

The React frontend includes:

1. **Hero Section** - Animated welcome banner
2. **Pet Catalog** - Browse pets by category (Cats, Dogs, Fishes, Rabbits)
3. **Pet Cards** - Display pet details with images
4. **Shopping Cart** - Add/remove pets, update quantities
5. **Checkout** - Multi-step checkout process
6. **About Section** - Company information
7. **Contact Form** - Get in touch
8. **Responsive Design** - Works on all devices

---

## 🏗️ Project Structure

```
Pet Kingdom/
├── src/                      # React Frontend
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PetCard.tsx
│   │   ├── Cart.tsx
│   │   └── ...
│   ├── data/                 # Mock data
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
│
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/petkingdom/
│   │       ├── controller/   # REST controllers
│   │       ├── model/        # Entity classes
│   │       ├── repository/   # Data access layer
│   │       ├── service/      # Business logic
│   │       └── config/       # Configuration
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── schema.sql
│   └── pom.xml
│
├── README.md                 # Full documentation
├── QUICKSTART.md            # This file
└── package.json             # Frontend dependencies
```

---

## 🧪 Testing the Application

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api

---

## 🐛 Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**MySQL connection failed:**
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in application.properties
- Ensure database exists: `SHOW DATABASES;`

**Port 8080 already in use:**
```bash
# Change port in application.properties
server.port=8081
```

**Maven build fails:**
```bash
# Clean and rebuild
mvn clean install -U
```

---

## 📱 Mobile Testing

The application is fully responsive. Test on different screen sizes:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

Use browser DevTools to simulate different devices.

---

## 🎯 Next Steps

1. **Customize Styling** - Modify Tailwind config for branding
2. **Add Authentication** - Implement user login/registration
3. **Payment Integration** - Add Stripe/PayPal
4. **Email Notifications** - Send order confirmations
5. **Admin Dashboard** - Manage pets and orders
6. **Deploy** - Host on AWS/Heroku/Vercel

---

## 📞 Support

For issues or questions:
- Check README.md for detailed documentation
- Review API endpoints in controller classes
- Inspect database schema in schema.sql

---

**Happy Coding! 🐾👑**
