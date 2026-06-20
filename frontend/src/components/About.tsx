import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Pet Kingdom 👑
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about connecting loving families with their perfect pet companions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2020, Pet Kingdom started with a simple mission: to ensure every pet finds 
              a loving home and every family finds their perfect companion. What began as a small 
              local pet store has grown into a trusted destination for pet lovers across the region.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We work with responsible breeders and rescue organizations to bring you healthy, 
              happy pets. Every animal in our care receives comprehensive health checks, 
              vaccinations, and plenty of love before finding their forever home.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of pet experts is always ready to help you choose the right pet for your 
              lifestyle and provide guidance on pet care, nutrition, and training.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <span className="text-5xl mb-3 block">🏆</span>
              <h4 className="font-bold text-gray-800 mb-2">Quality Assured</h4>
              <p className="text-sm text-gray-600">All pets health-checked</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <span className="text-5xl mb-3 block">💉</span>
              <h4 className="font-bold text-gray-800 mb-2">Fully Vaccinated</h4>
              <p className="text-sm text-gray-600">Up-to-date vaccinations</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <span className="text-5xl mb-3 block">🏠</span>
              <h4 className="font-bold text-gray-800 mb-2">Home Raised</h4>
              <p className="text-sm text-gray-600">Socialized from birth</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <span className="text-5xl mb-3 block">📞</span>
              <h4 className="font-bold text-gray-800 mb-2">Lifetime Support</h4>
              <p className="text-sm text-gray-600">Expert advice always</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-4xl mb-4 block">❤️</span>
              <h4 className="font-bold text-lg mb-2">Compassion</h4>
              <p className="text-purple-100">
                We treat every animal with love and respect, ensuring their well-being is our top priority.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🤝</span>
              <h4 className="font-bold text-lg mb-2">Trust</h4>
              <p className="text-purple-100">
                Transparency in all our practices. We believe in honest communication with our customers.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🌟</span>
              <h4 className="font-bold text-lg mb-2">Excellence</h4>
              <p className="text-purple-100">
                We strive for the highest standards in pet care, customer service, and ethical practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
