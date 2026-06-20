import React from 'react';
import { Pet } from '../types/pet';
import { formatINR } from '../data/mockData';

interface PetModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (pet: Pet) => void;
}

const PetModal: React.FC<PetModalProps> = ({ pet, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !pet) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cat': return '🐱';
      case 'dog': return '🐕';
      case 'fish': return '🐠';
      case 'rabbit': return '🐰';
      default: return '🐾';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="relative bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-2xl sm:w-full mx-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-2xl">✕</span>
          </button>

          {/* Image — fills entirely, no padding, no gaps */}
          <div className="pet-image-container pet-image-container--modal">
            <img
              src={pet.image}
              srcSet={
                pet.image.includes('unsplash.com')
                  ? `${pet.image.split('?')[0]}?w=800&q=90&auto=format 800w, ${pet.image.split('?')[0]}?w=1200&q=92&auto=format 1200w, ${pet.image.split('?')[0]}?w=1600&q=95&auto=format 1600w, ${pet.image.split('?')[0]}?w=2000&q=95&auto=format 2000w`
                  : undefined
              }
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              alt={pet.breed}
              loading="eager"
              decoding="async"
              width={1600}
              height={1200}
              className="pet-image"
            />
            {!pet.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  Not Available
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{getCategoryIcon(pet.category)}</span>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{pet.name}</h2>
                <p className="text-gray-500">{pet.breed}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🎂</div>
                <div className="text-sm text-gray-500">Age</div>
                <div className="font-bold text-gray-800">{pet.age} years</div>
              </div>
              <div className="bg-pink-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{pet.gender === 'male' ? '♂️' : '♀️'}</div>
                <div className="text-sm text-gray-500">Gender</div>
                <div className="font-bold text-gray-800 capitalize">{pet.gender}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">💉</div>
                <div className="text-sm text-gray-500">Vaccinated</div>
                <div className="font-bold text-gray-800">{pet.vaccinated ? 'Yes' : 'No'}</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🏷️</div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-bold text-purple-600 text-sm">{formatINR(pet.price)}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About {pet.name}</h3>
              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${pet.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {pet.available ? '✓ Available' : '✗ Not Available'}
                </span>
                {pet.vaccinated && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    ✓ Vaccinated
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  ✓ Health Checked
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  ✓ Ready for Home
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAddToCart(pet);
                  onClose();
                }}
                disabled={!pet.available}
                className={`
                  flex-1 py-3 rounded-lg font-semibold transition-all
                  ${
                    pet.available
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {pet.available ? 'Add to Cart - ' + formatINR(pet.price) : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
