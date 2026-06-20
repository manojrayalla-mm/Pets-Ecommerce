# 🐾 Pet Kingdom — Pet Store E-Commerce App

A modern, full-featured pet store web application built with **React**, **TypeScript**, and **Tailwind CSS**. Browse, filter, and purchase pets online with a complete checkout experience.

🔗 **Live Demo**: [View on Railway](https://pets-ecommerce-production.up.railway.app)

---

## 📸 Features

- 🐱 **Browse Pets** — Cats, Dogs, Fish, Rabbits with beautiful images
- 🔍 **Category Filtering** — Filter by pet type instantly
- 🛒 **Shopping Cart** — Add/remove pets, adjust quantities
- 💳 **Full Checkout Flow** — Shipping address → Payment → Order confirmation
- 💰 **Multiple Payment Methods** — Credit/Debit Card, UPI, Net Banking, Wallets, EMI, COD
- 🎟️ **Coupon Codes** — Working discount system (`WELCOME20`, `PETLOVE15`, `DOGGO25`)
- 👤 **Login / Sign Up** — User authentication modal
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🔔 **Toast Notifications** — Real-time feedback on actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite |
| Deployment | Railway |
| Images | Unsplash API |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/manojrayalla-mm/Pets-Ecommerce.git
cd Pets-Ecommerce/pet-kingdom-pet-store-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
pet-kingdom-pet-store-app/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Navigation bar with cart icon
│   │   ├── Hero.tsx          # Landing page banner
│   │   ├── PetCard.tsx       # Individual pet listing card
│   │   ├── PetModal.tsx      # Pet detail popup
│   │   ├── Cart.tsx          # Shopping cart sidebar
│   │   ├── CheckoutModal.tsx # Multi-step checkout (address → payment)
│   │   ├── Login.tsx         # Auth modal (login/signup)
│   │   ├── About.tsx         # About section
│   │   ├── Contact.tsx       # Contact form section
│   │   └── Footer.tsx        # Site footer
│   ├── data/
│   │   └── mockData.ts       # Pet data, offers, coupon codes
│   ├── types/
│   │   └── pet.ts            # TypeScript interfaces
│   └── App.tsx               # Main application with state management
├── backend/                  # Spring Boot Java API (future integration)
│   └── src/main/java/com/petkingdom/
├── railway.json              # Railway deployment config
└── package.json
```

---

## 🎟️ Available Coupon Codes

| Code | Discount | Min Order |
|---|---|---|
| `WELCOME20` | 20% OFF (max ₹10,000) | ₹5,000 |
| `PETLOVE15` | 15% OFF (max ₹8,000) | ₹10,000 |
| `DOGGO25` | 25% OFF (max ₹15,000) | ₹15,000 |
| `CAT10` | 10% OFF (max ₹5,000) | No minimum |
| `FISHTANK` | 30% OFF (max ₹2,000) | ₹2,000 |
| `BUNNY100` | ₹2,000 flat OFF | ₹10,000 |

---

## ⚠️ Current Limitations (Frontend Demo)

> This is a frontend-only demo. The following features are simulated:

- **Login/Signup** — Accepts any credentials (no real authentication)
- **Payment** — Simulates processing (no real payment gateway)
- **Order Emails** — Confirmation shown on screen only (no actual email sent)
- **Cart** — Resets on page refresh (no database persistence)

---

## 🔮 Future Roadmap

- [ ] Connect Spring Boot backend (already in `/backend`)
- [ ] Real authentication with JWT
- [ ] Razorpay payment gateway integration
- [ ] MySQL database for order management
- [ ] Email confirmations via SMTP

---

## 👨‍💻 Developer

**Manoj Rayalla**
- GitHub: [@manojrayalla-mm](https://github.com/manojrayalla-mm)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
