import React from 'react';
import { Pet } from '../types/pet';
import { formatINR } from '../data/mockData';

interface PetCardProps {
  pet: Pet;
  onAddToCart: (pet: Pet) => void;
  onViewDetails: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onAddToCart, onViewDetails }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cat': return '🐱';
      case 'dog': return '🐕';
      case 'fish': return '🐠';
      case 'rabbit': return '🐰';
      default: return '🐾';
    }
  };

  // Calculate original price (before 10% discount) and savings
  const originalPrice = Math.round(pet.price / 0.9);
  const savings = originalPrice - pet.price;

  // Build responsive srcset for crisp images on all devices
  const buildSrcSet = (url: string) => {
    if (!url.includes('unsplash.com')) return undefined;
    const base = url.split('?')[0];
    return [
      `${base}?w=400&q=85&auto=format 400w`,
      `${base}?w=600&q=85&auto=format 600w`,
      `${base}?w=800&q=90&auto=format 800w`,
      `${base}?w=1200&q=90&auto=format 1200w`,
      `${base}?w=1600&q=95&auto=format 1600w`,
    ].join(', ');
  };

  return (
    <div className={`
      bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300
      hover:shadow-2xl hover:-translate-y-2 relative flex flex-col
      ${!pet.available ? 'opacity-75' : ''}
    `}>
      {/* Discount Badge */}
      <div className="absolute top-3 right-3 z-10 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center shadow-lg transform -rotate-12">
        <span className="text-xs font-bold leading-none">10%</span>
        <span className="text-[10px] font-bold leading-none mt-0.5">OFF</span>
      </div>

      {/* Image Container — fills entirely, no gaps/borders/padding */}
      <div className="pet-image-container">
        <img
          src={pet.image}
          srcSet={buildSrcSet(pet.image)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          alt={pet.breed}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1600}
          className="pet-image"
        />
        {!pet.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              Not Available
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {getCategoryIcon(pet.category)} {pet.breed}
        </div>
        {pet.vaccinated && (
          <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
            ✓ Vaccinated
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{pet.breed}</h3>
            <p className="text-sm text-gray-500">
              {pet.gender === 'male' ? '♂️ Male' : '♀️ Female'} • {pet.age} year{pet.age > 1 ? 's' : ''} old
            </p>
          </div>
        </div>

        {/* Price Section with Discount */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-2xl font-bold text-purple-600">{formatINR(pet.price)}</span>
            <span className="text-sm text-gray-400 line-through">{formatINR(originalPrice)}</span>
          </div>
          <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
            <span>🎉</span>
            You save {formatINR(savings)} (10% OFF)
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{pet.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
            {pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
          </span>
          {pet.vaccinated && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              Health Checked
            </span>
          )}
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
            ⚡ Hot Deal
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(pet)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(pet)}
            disabled={!pet.available}
            className={`
              flex-1 py-2 rounded-lg font-medium transition-all text-sm
              ${
                pet.available
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {pet.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
