import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiChevronLeft, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    clearCart
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setActivePaymentMethod(null);
    handlePlaceOrder();
  };

  const renderPaymentPopup = () => {
    switch (activePaymentMethod) {
      case 'upi':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1A2A4F]">UPI Payment</h3>
                <button onClick={() => setActivePaymentMethod(null)} className="text-[#5A5A5A] hover:text-[#1A2A4F]">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1A2A4F] mb-1">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-[#1A2A4F] focus:border-[#1A2A4F]"
                    value={paymentForm.upiId}
                    onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F]"
                >
                  Pay ₹{cartTotal}
                </button>
              </form>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1A2A4F]">Card Payment</h3>
                <button onClick={() => setActivePaymentMethod(null)} className="text-[#5A5A5A] hover:text-[#1A2A4F]">
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1A2A4F] mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-[#1A2A4F] focus:border-[#1A2A4F]"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A2A4F] mb-1">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-[#1A2A4F] focus:border-[#1A2A4F]"
                      value={paymentForm.expiry}
                      onChange={(e) => setPaymentForm({...paymentForm, expiry: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2A4F] mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-[#1A2A4F] focus:border-[#1A2A4F]"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F]"
                >
                  Pay ₹{cartTotal}
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-[#E0E0E0]/50">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#D2B66A]/20 mb-4">
            <svg className="h-6 w-6 text-[#D2B66A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A2A4F] mb-2">Order Confirmed!</h2>
          <p className="text-[#5A5A5A] font-light mb-6">
            Your payment was successful. Your items are being packed at the store.
          </p>
          <div className="bg-[#F8F5F0] p-4 rounded-lg mb-6 text-left border border-[#E0E0E0]/50">
            <h3 className="font-medium text-[#1A2A4F] mb-2">Pickup Information</h3>
            <p className="text-sm text-[#5A5A5A] font-light">
              • You can collect your order anytime during store hours<br />
              • Please bring your payment receipt<br />
              • Order ID: #{Math.floor(Math.random() * 1000000)}<br />
              • Store: {cartItems[0]?.shopName || 'The Local Shop'}
            </p>
          </div>
          <Link
            to="/shops"
            className="inline-block px-6 py-2 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors"
          >
            Back to Shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderPaymentPopup()}
      
      {/* Cart header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A2A4F] flex items-center">
          <FiShoppingCart className="mr-2" />
          Your Cart {cartCount > 0 && `(${cartCount})`}
        </h1>
        <Link 
          to="/shops" 
          className="flex items-center text-[#1A2A4F] hover:text-[#2A3A5F] transition-colors"
        >
          <FiChevronLeft className="mr-1" /> Continue Shopping
        </Link>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-[#E0E0E0]/50">
          <FiShoppingCart className="mx-auto h-12 w-12 text-[#E0E0E0] mb-4" />
          <h3 className="text-lg font-medium text-[#1A2A4F]">Your cart is empty</h3>
          <p className="mt-1 text-[#5A5A5A] font-light mb-6">Start adding some products from our shops</p>
          <Link
            to="/shops"
            className="inline-block px-6 py-2 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors"
          >
            Browse Shops
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E0E0E0]/50">
          {/* Cart items list */}
          <div className="divide-y divide-[#E0E0E0]/50">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.shopId}`} className="p-4 flex">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border border-[#E0E0E0]/50"
                />
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-[#1A2A4F]">{item.name}</h3>
                      <p className="text-sm text-[#5A5A5A] font-light">{item.shopName}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#5A5A5A] hover:text-[#D2B66A] ml-2 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#1A2A4F]">₹{item.price}</span>
                    
                    <div className="flex items-center border border-[#E0E0E0]/50 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-[#5A5A5A] hover:bg-[#F8F5F0] transition-colors"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm text-[#1A2A4F]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-[#5A5A5A] hover:bg-[#F8F5F0] transition-colors"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="border-t border-[#E0E0E0]/50 p-6">
            <h2 className="text-lg font-medium text-[#1A2A4F] mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between pt-3 border-t border-[#E0E0E0]/50">
                <span className="text-lg font-medium text-[#1A2A4F]">Total Amount</span>
                <span className="text-lg font-bold text-[#1A2A4F]">₹{cartTotal}</span>
              </div>
            </div>

            {/* Payment options */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-[#1A2A4F] mb-2">Pay Now, Pickup Later</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setActivePaymentMethod('upi')}
                  className="p-3 border border-[#E0E0E0]/50 rounded-lg hover:border-[#1A2A4F] flex items-center justify-center transition-colors"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/179/179457.png" 
                    alt="UPI" 
                    className="h-6 mr-2" 
                  />
                  UPI
                </button>
                <button 
                  onClick={() => setActivePaymentMethod('card')}
                  className="p-3 border border-[#E0E0E0]/50 rounded-lg hover:border-[#1A2A4F] flex items-center justify-center transition-colors"
                >
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/196/196566.png" 
                    alt="Cards" 
                    className="h-6 mr-2" 
                  />
                  Cards
                </button>
              </div>

              <div className="bg-[#F8F5F0] p-4 rounded-lg mb-6 border border-[#E0E0E0]/50">
                <h4 className="font-medium text-[#1A2A4F] mb-2">Pickup Information</h4>
                <ul className="text-sm text-[#5A5A5A] font-light list-disc pl-5 space-y-1">
                  <li>Pay online and collect from {cartItems[0]?.shopName || 'the store'}</li>
                  <li>No delivery - in-store pickup only</li>
                  <li>Open 9AM-9PM, 7 days a week</li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={clearCart}
                className="w-full py-3 px-4 border border-[#E0E0E0]/50 rounded-lg text-[#1A2A4F] hover:bg-[#F8F5F0] transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}