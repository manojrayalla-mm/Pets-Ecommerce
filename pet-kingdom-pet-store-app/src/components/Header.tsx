import React, { useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onLoginClick: () => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  onHomeClick,
  onLoginClick,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Contact Bar */}
      <div className="bg-purple-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
              <a href="tel:+919346632397" className="flex items-center gap-1 hover:text-pink-200 transition-colors">
                <span>📞</span>
                <span className="font-medium">+91 93466 32397</span>
              </a>
              <a href="mailto:manojroyal5581@gmail.com" className="flex items-center gap-1 hover:text-pink-200 transition-colors">
                <span>✉️</span>
                <span className="font-medium">manojroyal5581@gmail.com</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1 text-pink-200">
              <span>📍</span>
              <span>Narayana Reddy Peta, Nellore-524314</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={onHomeClick}
            >
              <span className="text-4xl">👑</span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Pet Kingdom</h1>
                <p className="text-xs text-pink-200">Your Royal Pet Destination</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={onHomeClick}
                className="hover:text-pink-200 transition-colors font-medium"
              >
                Home
              </button>
              <a href="#pets" className="hover:text-pink-200 transition-colors font-medium">
                Our Pets
              </a>
              <a href="#about" className="hover:text-pink-200 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="hover:text-pink-200 transition-colors font-medium">
                Contact
              </a>
            </nav>

            {/* Right Side: Login, Cart & Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* User Menu / Login Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 bg-yellow-400 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-medium text-sm max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-20 text-gray-800">
                        <div className="px-4 py-3 border-b">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3">
                          <span>👤</span> My Profile
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3">
                          <span>📦</span> My Orders
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3">
                          <span>❤️</span> Wishlist
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3">
                          <span>⚙️</span> Settings
                        </button>
                        <div className="border-t mt-2 pt-2">
                          <button
                            onClick={() => {
                              onLogout();
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-3"
                          >
                            <span>🚪</span> Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="hidden sm:flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-yellow-300 hover:text-purple-800 transition-all transform hover:scale-105 shadow-md"
                >
                  <span>👤</span>
                  <span>Login</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Shopping cart"
              >
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => { onHomeClick(); setMobileMenuOpen(false); }}
                  className="text-left hover:text-pink-200 transition-colors font-medium py-2"
                >
                  Home
                </button>
                <a href="#pets" className="hover:text-pink-200 transition-colors font-medium py-2">
                  Our Pets
                </a>
                <a href="#about" className="hover:text-pink-200 transition-colors font-medium py-2">
                  About Us
                </a>
                <a href="#contact" className="hover:text-pink-200 transition-colors font-medium py-2">
                  Contact
                </a>
                {!user && (
                  <button
                    onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                    className="text-left bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 w-fit"
                  >
                    <span>👤</span> Login / Sign Up
                  </button>
                )}
                <div className="border-t border-white/20 pt-3 space-y-2">
                  <a href="tel:+919346632397" className="hover:text-pink-200 transition-colors font-medium py-1 flex items-center gap-2">
                    <span>📞</span> +91 93466 32397
                  </a>
                  <a href="mailto:manojroyal5581@gmail.com" className="hover:text-pink-200 transition-colors font-medium py-1 flex items-center gap-2 break-all">
                    <span>✉️</span> manojroyal5581@gmail.com
                  </a>
                  <p className="flex items-center gap-2 text-sm text-pink-200 py-1">
                    <span>📍</span> Narayana Reddy Peta, Nellore-524314
                  </p>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
