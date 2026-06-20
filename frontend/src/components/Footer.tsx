import React from 'react';
import { WEBSITE_URL } from '../data/mockData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">👑</span>
              <div>
                <h3 className="text-2xl font-bold">Pet Kingdom</h3>
                <p className="text-gray-400 text-sm">Your Royal Pet Destination</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting loving families with their perfect pet companions since 2020. 
              Every pet deserves a royal home, and every family deserves a loyal friend.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a 
                href="https://maps.google.com/?q=Narayana+Reddy+Peta+Nellore+524314" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <span className="text-xl flex-shrink-0">📍</span>
                <span>Narayana Reddy Peta, Nellore-524314, Andhra Pradesh, India</span>
              </a>
              <a href="tel:+919346632397" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-xl">📞</span>
                <span>+91 93466 32397</span>
              </a>
              <a href="mailto:manojroyal5581@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-xl">✉️</span>
                <span className="break-all">manojroyal5581@gmail.com</span>
              </a>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-pink-400 transition-colors">📘</a>
              <a href="#" className="text-2xl hover:text-pink-400 transition-colors">📸</a>
              <a href="#" className="text-2xl hover:text-pink-400 transition-colors">🐦</a>
              <a href="#" className="text-2xl hover:text-pink-400 transition-colors">📺</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#pets" className="text-gray-400 hover:text-white transition-colors">Our Pets</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Pet Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Pet Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">🐱 Cats</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">🐕 Dogs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">🐠 Fishes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">🐰 Rabbits</a></li>
            </ul>
          </div>
        </div>

        {/* FREE Website Link - Single Line - Click to Open on Any Device */}
        <div className="border-t border-gray-800 mt-12 pt-8 pb-6">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-4 flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">FREE</span>
            <span className="text-2xl">🌐</span>
            <span className="text-gray-300 font-medium">Visit our website:</span>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-yellow-200 font-bold text-lg underline decoration-2 underline-offset-4 break-all"
              title="Click to open Pet Kingdom website on any device — TV, Laptop, Mobile, Tablet"
            >
              {WEBSITE_URL}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Pet Kingdom. All rights reserved. | Prices in Indian Rupees (₹)
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
