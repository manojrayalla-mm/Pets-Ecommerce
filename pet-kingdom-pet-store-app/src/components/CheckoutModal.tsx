import React, { useState } from 'react';
import { CartItem } from '../types/pet';
import { formatINR, offers } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onComplete: (orderData: any) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  // Card details
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  // UPI
  upiId: string;
  // Net Banking
  bank: string;
  // Wallet
  wallet: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof offers[0] | null>(null);
  const [couponError, setCouponError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Nellore',
    state: 'Andhra Pradesh',
    pincode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    bank: '',
    wallet: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.pet.price * item.quantity, 0);
  
  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount > 0) {
      couponDiscount = Math.min(
        (subtotal * appliedCoupon.discount) / 100,
        appliedCoupon.maxDiscount
      );
    } else {
      couponDiscount = appliedCoupon.maxDiscount;
    }
  }
  
  const discountedSubtotal = subtotal - couponDiscount;
  const gst = discountedSubtotal * 0.18;
  const shipping = 0;
  const total = discountedSubtotal + gst + shipping;

  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }
    const found = offers.find((o) => o.code === code);
    if (!found) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (subtotal < found.minAmount) {
      setCouponError(`Minimum order ${formatINR(found.minAmount)} required for this coupon`);
      return;
    }
    setAppliedCoupon(found);
    setCouponError('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
    }
    // Format expiry
    if (name === 'cardExpiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').substring(0, 5);
    }
    // Limit CVV
    if (name === 'cardCvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }
    // Limit phone
    if (name === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 10);
    }
    // Limit pincode
    if (name === 'pincode') {
      value = value.replace(/\D/g, '').substring(0, 6);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newOrderId = 'PK' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    
    const orderData = {
      id: newOrderId,
      customer: formData,
      items: cartItems,
      subtotal,
      gst,
      total,
      paymentMethod: formData.paymentMethod,
      date: new Date().toISOString(),
    };
    
    setIsProcessing(false);
    setStep(3);
    
    // Notify parent after showing success screen
    setTimeout(() => {
      onComplete(orderData);
    }, 100);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      ...formData,
      cardNumber: '',
      cardCvv: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard, Amex, RuPay' },
    { id: 'debit-card', name: 'Debit Card', icon: '💳', desc: 'All Indian banks supported' },
    { id: 'upi', name: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm, BHIM' },
    { id: 'net-banking', name: 'Net Banking', icon: '🏦', desc: 'All major Indian banks' },
    { id: 'wallet', name: 'Wallet', icon: '👛', desc: 'Paytm, PhonePe, Amazon Pay' },
    { id: 'emi', name: 'EMI', icon: '📊', desc: '3, 6, 9, 12 months EMI options' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
  ];

  const indianBanks = [
    'State Bank of India (SBI)',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank (PNB)',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IDBI Bank',
    'Yes Bank',
    'IndusInd Bank',
  ];

  const wallets = [
    { id: 'paytm', name: 'Paytm', icon: '💙' },
    { id: 'phonepe', name: 'PhonePe', icon: '💜' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: '🟠' },
    { id: 'mobikwik', name: 'MobiKwik', icon: '🔵' },
    { id: 'freecharge', name: 'Freecharge', icon: '🟢' },
    { id: 'jio', name: 'JioMoney', icon: '🔴' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl my-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 ? '📦 Shipping Details' : step === 2 ? '💳 Payment Method' : '✅ Order Confirmed'}
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-2xl">✕</span>
            </button>
          </div>

          {/* Progress Steps */}
          {step < 3 && (
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium text-sm">Shipping</span>
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium text-sm">Payment</span>
                </div>
                <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 font-medium text-sm">Confirm</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Shipping Details */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="Manoj Kumar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (10 digits) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="9346632397"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="524314"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      rows={2}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      placeholder="House No, Street, Locality"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Payment Method</h3>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-semibold text-gray-800">{method.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Credit/Debit Card Details */}
                {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 mb-6 border border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">💳</span>
                      <h4 className="font-semibold text-gray-800">
                        {formData.paymentMethod === 'credit-card' ? 'Credit Card Details' : 'Debit Card Details'}
                      </h4>
                      <div className="ml-auto flex gap-2">
                        <span className="px-2 py-1 bg-white rounded text-xs font-bold text-blue-700">VISA</span>
                        <span className="px-2 py-1 bg-white rounded text-xs font-bold text-orange-600">MC</span>
                        <span className="px-2 py-1 bg-white rounded text-xs font-bold text-green-700">RuPay</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none uppercase"
                          placeholder="MANOJ KUMAR"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY) *</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono"
                            placeholder="12/26"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                          <input
                            type="password"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono"
                            placeholder="•••"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span>🔒</span> Your card details are 256-bit SSL encrypted and secure
                      </p>
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {formData.paymentMethod === 'upi' && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 mb-6 border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">📱</span>
                      <h4 className="font-semibold text-gray-800">UPI Payment</h4>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="bg-white p-3 rounded-lg text-center border">
                        <div className="text-2xl">🟢</div>
                        <div className="text-xs mt-1 font-medium">GPay</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border">
                        <div className="text-2xl">💜</div>
                        <div className="text-xs mt-1 font-medium">PhonePe</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border">
                        <div className="text-2xl">💙</div>
                        <div className="text-xs mt-1 font-medium">Paytm</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border">
                        <div className="text-2xl">🟠</div>
                        <div className="text-xs mt-1 font-medium">BHIM</div>
                      </div>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter UPI ID *</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="yourname@okaxis"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Example: yourname@okhdfcbank, yourname@paytm, 9346632397@upi
                    </p>
                  </div>
                )}

                {/* Net Banking */}
                {formData.paymentMethod === 'net-banking' && (
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 mb-6 border border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🏦</span>
                      <h4 className="font-semibold text-gray-800">Select Your Bank</h4>
                    </div>
                    <select
                      name="bank"
                      value={formData.bank}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">-- Select Bank --</option>
                      {indianBanks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <span>🔒</span> You will be redirected to your bank's secure portal
                    </p>
                  </div>
                )}

                {/* Wallet */}
                {formData.paymentMethod === 'wallet' && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 mb-6 border border-yellow-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">👛</span>
                      <h4 className="font-semibold text-gray-800">Select Wallet</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {wallets.map((w) => (
                        <label
                          key={w.id}
                          className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.wallet === w.id
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="wallet"
                            value={w.id}
                            checked={formData.wallet === w.id}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <span className="text-2xl">{w.icon}</span>
                          <span className="font-medium text-sm">{w.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* EMI */}
                {formData.paymentMethod === 'emi' && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 mb-6 border border-indigo-200">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">📊</span>
                      <h4 className="font-semibold text-gray-800">EMI Options</h4>
                    </div>
                    <div className="space-y-2">
                      {[3, 6, 9, 12].map((months) => (
                        <label key={months} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="emi" value={months} />
                            <span className="font-medium">{months} Months</span>
                          </div>
                          <span className="text-purple-600 font-bold">
                            {formatINR(total / months)}/month
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      * EMI available on credit cards from major Indian banks
                    </p>
                  </div>
                )}

                {/* COD */}
                {formData.paymentMethod === 'cod' && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 mb-6 border border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💵</span>
                      <h4 className="font-semibold text-gray-800">Cash on Delivery</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Pay <span className="font-bold text-purple-600">{formatINR(total)}</span> in cash when your pet is delivered to your doorstep.
                    </p>
                    <p className="text-xs text-orange-700 mt-3 flex items-start gap-1 bg-orange-100 p-2 rounded">
                      <span>⚠️</span>
                      <span>COD available for orders below ₹1,00,000. Additional ₹50 COD charges apply.</span>
                    </p>
                  </div>
                )}

                {/* Coupon Code Section */}
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                    <span>🎟️</span> Have a Coupon Code?
                  </h4>
                  {!appliedCoupon ? (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none uppercase font-mono"
                          placeholder="ENTER CODE"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                          <span>⚠️</span> {couponError}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 mt-2">
                        💡 Try: <span className="font-mono font-bold">WELCOME20</span>, <span className="font-mono font-bold">PETLOVE15</span>, <span className="font-mono font-bold">DOGGO25</span>
                      </p>
                    </>
                  ) : (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-green-800 flex items-center gap-2">
                          <span>✅</span> {appliedCoupon.code} Applied!
                        </p>
                        <p className="text-sm text-green-700">{appliedCoupon.title} — You saved {formatINR(couponDiscount)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span>📋</span> Order Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    {cartItems.map((item) => (
                      <div key={item.pet.id} className="flex justify-between">
                        <span className="text-gray-700">{item.pet.name} × {item.quantity}</span>
                        <span className="font-medium">{formatINR(item.pet.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatINR(subtotal)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>Coupon Discount ({appliedCoupon.code})</span>
                          <span>- {formatINR(couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>GST (18%)</span>
                        <span>{formatINR(gst)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">FREE</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-purple-600">{formatINR(total)}</span>
                      </div>
                      {(couponDiscount > 0) && (
                        <div className="bg-green-50 rounded p-2 text-center text-green-700 font-medium text-xs mt-2">
                          🎉 You saved {formatINR(couponDiscount)} on this order!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">100% Secure Payment</p>
                    <p className="text-xs text-green-700">Powered by Razorpay • PCI DSS Compliant • SSL Encrypted</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-[2] bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <span className="inline-block animate-spin">⏳</span>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        🔒 Pay {formatINR(total)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <span className="text-5xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your new family member will arrive soon! 🎉
                </p>
                
                {/* Order Details */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 mb-6 text-left max-w-md mx-auto border border-purple-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-bold text-purple-700">#{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="font-bold text-green-600">{formatINR(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-800 capitalize">
                        {formData.paymentMethod.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium text-gray-800">3-5 days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
                  📧 A confirmation email with invoice has been sent to <strong>{formData.email}</strong>
                </div>

                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Continue Shopping 🛍️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
