import React, { useState } from 'react';
import { offers, WEBSITE_URL } from '../data/mockData';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const copyToClipboard = async (text: string, type: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (type === 'code') {
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    } else {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch 📬
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? Reach out to us — and don't miss our exclusive offers!
          </p>
        </div>

        {/* ===== FREE Website Link — single clickable line, opens on any device ===== */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 rounded-2xl p-1 shadow-2xl">
            <div className="bg-white rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    FREE
                  </span>
                  <span className="text-2xl">🌐</span>
                  <span className="font-bold text-gray-800 hidden sm:inline">Visit our website:</span>
                </div>

                {/* Single-line clickable link — opens on TV, Laptop, Mobile, Tablet */}
                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to open Pet Kingdom website on any device"
                  className="flex-1 min-w-0 text-center sm:text-left text-base sm:text-lg lg:text-xl font-bold text-purple-700 hover:text-pink-600 transition-colors truncate underline decoration-2 decoration-purple-300 hover:decoration-pink-400 underline-offset-4"
                >
                  {WEBSITE_URL}
                </a>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => copyToClipboard(WEBSITE_URL, 'link')}
                    className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                      linkCopied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {linkCopied ? '✓ Copied' : '📋 Copy'}
                  </button>
                  <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold text-xs sm:text-sm hover:shadow-lg transition-all"
                  >
                    🚀 Open
                  </a>
                </div>
              </div>

              {/* Device compatibility row */}
              <div className="mt-3 pt-3 border-t flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-gray-600">
                <span className="font-medium">Works on:</span>
                <span className="flex items-center gap-1">📺 Smart TV</span>
                <span className="flex items-center gap-1">💻 Laptop</span>
                <span className="flex items-center gap-1">🖥️ Desktop</span>
                <span className="flex items-center gap-1">📱 Mobile</span>
                <span className="flex items-center gap-1">📲 Tablet</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 3-column layout: Offers (left) | Contact Info (middle) | Form (right) ===== */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ===== LEFT SIDE: Offers & Coupons ===== */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-2xl p-5 border-2 border-orange-200 sticky top-32">
              <div className="text-center mb-4">
                <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 animate-pulse">
                  🔥 EXCLUSIVE OFFERS
                </div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  🎟️ Coupons & Deals
                </h3>
                <p className="text-sm text-gray-600 mt-1">All pets already 10% OFF!</p>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${offer.bgColor} p-3 text-white relative overflow-hidden`}>
                      <div className="absolute -top-4 -right-4 w-14 h-14 bg-white/10 rounded-full" />
                      <div className="relative flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-2xl flex-shrink-0">{offer.icon}</span>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm truncate">{offer.title}</h4>
                            <p className="text-[11px] text-white/90 line-clamp-2">{offer.description}</p>
                          </div>
                        </div>
                        {offer.discount > 0 ? (
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl font-extrabold leading-none">{offer.discount}%</div>
                            <div className="text-[9px] uppercase">OFF</div>
                          </div>
                        ) : (
                          <div className="text-right flex-shrink-0">
                            <div className="text-base font-extrabold leading-none">₹{offer.maxDiscount}</div>
                            <div className="text-[9px] uppercase">OFF</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] text-gray-500 uppercase tracking-wider">Code</p>
                          <p className="font-mono font-bold text-xs text-gray-800 truncate">{offer.code}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(offer.code, 'code')}
                          className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all whitespace-nowrap ${
                            copiedCode === offer.code
                              ? 'bg-green-500 text-white'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {copiedCode === offer.code ? '✓' : 'Copy'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1.5">
                        <span>Min: ₹{offer.minAmount.toLocaleString('en-IN')}</span>
                        <span>Till {offer.expiry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-center">
                <p className="text-xs text-gray-700">
                  💡 <strong>Tip:</strong> Copy code & apply at checkout for extra savings on already-discounted prices!
                </p>
              </div>
            </div>
          </div>

          {/* ===== MIDDLE: Contact Info ===== */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Visit Us</h4>
                  <a
                    href="https://maps.google.com/?q=Narayana+Reddy+Peta+Nellore+524314"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-600 transition-colors block"
                  >
                    Narayana Reddy Peta,<br />
                    Nellore - 524314,<br />
                    Andhra Pradesh, India
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Call Us</h4>
                  <a href="tel:+919346632397" className="text-gray-600 hover:text-purple-600 transition-colors block">
                    +91 93466 32397
                  </a>
                  <p className="text-gray-500 text-sm">Available 24/7 for support</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">✉️</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Email Us</h4>
                  <a href="mailto:manojroyal5581@gmail.com" className="text-gray-600 hover:text-purple-600 transition-colors block break-all">
                    manojroyal5581@gmail.com
                  </a>
                  <p className="text-gray-500 text-sm">We'll reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">🕐</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Business Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-11 h-11 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all">📘</a>
                <a href="#" className="w-11 h-11 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all">📸</a>
                <a href="#" className="w-11 h-11 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all">🐦</a>
                <a href="#" className="w-11 h-11 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all">📺</a>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: Contact Form ===== */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">Send a Message</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">✅</span>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">Thank you. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    Send Message 📤
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ===== Map Section ===== */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span>🗺️</span> Find Us on the Map
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Narayana Reddy Peta, Nellore-524314, Andhra Pradesh, India
                </p>
              </div>
              <div className="relative h-80 w-full">
                <iframe
                  title="Pet Kingdom Shop Location"
                  src="https://maps.google.com/maps?q=Narayana+Reddy+Peta+Nellore+524314&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
