import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import PetCard from './components/PetCard';
import PetModal from './components/PetModal';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import { mockPets, categories } from './data/mockData';
import { Pet, CartItem } from './types/pet';

interface User {
  name: string;
  email: string;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Filter pets by category
  const filteredPets = selectedCategory === 'all'
    ? mockPets
    : mockPets.filter(pet => pet.category === selectedCategory);

  // Cart functions
  const addToCart = (pet: Pet) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.pet.id === pet.id);
      if (existing) {
        return prev.map(item =>
          item.pet.id === pet.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { pet, quantity: 1 }];
    });
    showNotificationToast(`${pet.name} added to cart!`);
  };

  const updateQuantity = (petId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(petId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.pet.id === petId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (petId: number) => {
    setCartItems(prev => prev.filter(item => item.pet.id !== petId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Notification toast
  const showNotificationToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // View pet details
  const viewPetDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  // Checkout - require login first
  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
      showNotificationToast('Please login to checkout');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Order placed:', orderData);
    setCartItems([]);
    setIsCheckoutOpen(false);
    showNotificationToast('Order placed successfully! 🎉');
  };

  // Login functions
  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setIsLoginOpen(false);
    showNotificationToast(`Welcome, ${userData.name}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    showNotificationToast('You have been logged out');
  };

  // Scroll to pets section
  const scrollToPets = () => {
    document.getElementById('pets')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onLoginClick={() => setIsLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <Hero onShopNowClick={scrollToPets} />

      {/* Pets Section */}
      <section id="pets" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Royal Pets 🐾
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your perfect companion from our carefully selected collection
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Pets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                onAddToCart={addToCart}
                onViewDetails={viewPetDetails}
              />
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">😢</span>
              <h3 className="text-xl font-semibold text-gray-700">No pets found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Pet Details Modal */}
      <PetModal
        pet={selectedPet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onComplete={handleOrderComplete}
      />

      {/* Login Modal */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-[60] animate-bounce">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
