import React, { useState } from 'react';
import { CartItem } from '../types/pet';
import { formatINR, offers } from '../data/mockData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (petId: number, quantity: number) => void;
  onRemoveItem: (petId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'coupons' | 'payments'>('cart');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.pet.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isOpen) return null;

  const paymentMethods = [
    { name: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard, Amex, RuPay' },
    { name: 'Debit Card', icon: '💳', desc: 'All Indian banks' },
    { name: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm, BHIM' },
    { name: 'Net Banking', icon: '🏦', desc: 'SBI, HDFC, ICICI, Axis, etc.' },
    { name: 'Wallets', icon: '👛', desc: 'Paytm, PhonePe, Amazon Pay' },
    { name: 'EMI', icon: '📊', desc: '3, 6, 9, 12 month options' },
    { name: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🛒 Your Cart
            <span className="text-sm font-normal bg-white/20 px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'cart'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            🛍️ Cart
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'coupons'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            🎟️ Coupons
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'payments'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            💳 Payments
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* CART TAB */}
          {activeTab === 'cart' && (
            <div className="p-5">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some adorable pets to get started!</p>
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.pet.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="pet-image-container pet-image-container--thumb">
                        <img
                          src={item.pet.image}
                          alt={item.pet.breed}
                          className="pet-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.pet.breed}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.pet.category}</p>
                        <p className="text-purple-600 font-bold">{formatINR(item.pet.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.pet.id, item.quantity - 1)}
                            className="w-7 h-7 bg-white border rounded-lg hover:bg-gray-100 transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="w-7 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.pet.id, item.quantity + 1)}
                            className="w-7 h-7 bg-white border rounded-lg hover:bg-gray-100 transition-colors text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.pet.id)}
                            className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COUPONS TAB */}
          {activeTab === 'coupons' && (
            <div className="p-5">
              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-300">
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <span>💡</span> Copy a code and apply it at checkout for instant savings!
                </p>
              </div>
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${offer.bgColor} p-3 text-white relative overflow-hidden`}>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                      <div className="relative flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{offer.icon}</span>
                          <div>
                            <h4 className="font-bold text-sm">{offer.title}</h4>
                            <p className="text-xs text-white/90">{offer.description}</p>
                          </div>
                        </div>
                        {offer.discount > 0 ? (
                          <div className="text-right">
                            <div className="text-2xl font-extrabold leading-none">{offer.discount}%</div>
                            <div className="text-[10px] uppercase">OFF</div>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="text-lg font-extrabold leading-none">₹{offer.maxDiscount}</div>
                            <div className="text-[10px] uppercase">OFF</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Code</p>
                          <p className="font-mono font-bold text-sm text-gray-800 truncate">{offer.code}</p>
                        </div>
                        <button
                          onClick={() => handleCopyCode(offer.code)}
                          className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-all whitespace-nowrap ${
                            copiedCode === offer.code
                              ? 'bg-green-500 text-white'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {copiedCode === offer.code ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                        <span>Min: ₹{offer.minAmount.toLocaleString('en-IN')}</span>
                        <span>Valid till {offer.expiry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="p-5">
              <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">100% Secure Payments</p>
                  <p className="text-xs text-green-700">PCI DSS Compliant • SSL Encrypted</p>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mb-3">Accepted Payment Methods</h3>
              <div className="space-y-2 mb-5">
                {paymentMethods.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 bg-white border rounded-lg p-3 hover:border-purple-300 transition-colors"
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-gray-800 mb-3">Supported Cards & Apps</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-bold text-xs">VISA</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded font-bold text-xs">Mastercard</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-bold text-xs">Amex</span>
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded font-bold text-xs">RuPay</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded font-bold text-xs">UPI</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded font-bold text-xs">Net Banking</span>
                <span className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded font-bold text-xs">Paytm</span>
                <span className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded font-bold text-xs">PhonePe</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded font-bold text-xs">GPay</span>
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded font-bold text-xs">BHIM</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded font-bold text-xs">💵 COD</span>
              </div>

              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="text-xs text-purple-800 flex items-start gap-2">
                  <span>ℹ️</span>
                  <span>All payments are processed through secure gateway. Your card details are never stored on our servers.</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Totals & Checkout - always visible when cart has items */}
        {cartItems.length > 0 && (
          <div className="border-t p-5 bg-gray-50">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">{formatINR(gst)}</span>
            </div>
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t mb-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-purple-600">{formatINR(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-[1.02]"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
