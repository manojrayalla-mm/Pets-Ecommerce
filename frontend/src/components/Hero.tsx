import React from 'react';

interface HeroProps {
  onShopNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-8xl animate-bounce">🐾</div>
        <div className="absolute top-40 right-20 text-6xl animate-pulse">🐱</div>
        <div className="absolute bottom-20 left-1/4 text-7xl animate-bounce" style={{ animationDelay: '0.5s' }}>🐕</div>
        <div className="absolute bottom-40 right-1/3 text-5xl animate-pulse" style={{ animationDelay: '1s' }}>🐰</div>
        <div className="absolute top-1/2 left-2/3 text-6xl animate-bounce" style={{ animationDelay: '0.3s' }}>🐠</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to{' '}
            <span className="text-yellow-300">Pet Kingdom</span>
            <span className="block text-2xl md:text-3xl mt-2 font-normal">
              👑 Where Every Pet Finds Royalty
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-pink-100 max-w-3xl mx-auto mb-8">
            Discover your perfect companion from our royal collection of cats, dogs, fishes, and rabbits. 
            Each pet is health-checked, vaccinated, and ready to bring joy to your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onShopNowClick}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-800 transition-all transform hover:scale-105 shadow-lg"
            >
              🛍️ Shop Now
            </button>
            <a
              href="#about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              Learn More
            </a>
          </div>



          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">500+</div>
              <div className="text-pink-100">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">4</div>
              <div className="text-pink-100">Pet Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">100%</div>
              <div className="text-pink-100">Health Guaranteed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">24/7</div>
              <div className="text-pink-100">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
