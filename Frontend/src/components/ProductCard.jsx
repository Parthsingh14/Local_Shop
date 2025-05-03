import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiPlus, FiMinus, FiEye, FiStar } from 'react-icons/fi';

export default function ProductCard({ 
  product, 
  shopName,
  initialQuantity = 0,
  onViewDetails 
}) {
  const { addToCart, updateQuantity } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, shopName }, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0]/50 group cursor-pointer"
      onClick={onViewDetails}
    >
      {/* Image section */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* View details button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="absolute top-3 right-3 bg-[#1A2A4F]/90 text-[#F8F5F0] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FiEye size={16} />
        </button>
        
        {/* Bestseller badge */}
        {product.tags?.includes('bestseller') && (
          <span className="absolute top-3 left-3 bg-[#D2B66A] text-[#1A2A4F] text-xs font-bold px-2 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-[#1A2A4F] line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#5A5A5A] font-light">From {shopName}</p>
          </div>
          <div className="flex items-center bg-[#F8F5F0] px-2 py-1 rounded-full">
            <FiStar className="text-[#D2B66A] text-xs mr-1" />
            <span className="text-xs text-[#1A2A4F]">{product.rating || '4.5'}</span>
          </div>
        </div>
        
        <p className="text-sm text-[#5A5A5A] font-light mb-4 line-clamp-2">{product.description}</p>
        
        <div 
          className="flex justify-between items-center pt-3 border-t border-[#E0E0E0]/30"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-bold text-[#1A2A4F]">₹{product.price}</span>
          
          {initialQuantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, initialQuantity - 1);
                }}
                className="p-1 text-[#5A5A5A] hover:text-[#1A2A4F] transition-colors"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-6 text-center text-sm text-[#1A2A4F]">{initialQuantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, initialQuantity + 1);
                }}
                className="p-1 text-[#5A5A5A] hover:text-[#1A2A4F] transition-colors"
              >
                <FiPlus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-sm ${
                isAdded
                  ? 'bg-[#D2B66A]/20 text-[#D2B66A]'
                  : 'bg-[#1A2A4F] text-[#F8F5F0] hover:bg-[#2A3A5F]'
              } transition-colors`}
            >
              <FiShoppingCart className="mr-1.5" size={14} />
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}