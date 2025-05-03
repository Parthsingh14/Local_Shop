import { Link } from 'react-router-dom';

export default function ShopCard({ shop, className = '', animationDelay = 0 }) {
  return (
    <Link 
      to={`/shop/${shop.id}`}
      className={`group block relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0]/50 ${className}`}
      style={{
        animation: `fadeInUp 0.5s ease-out ${animationDelay}ms forwards`,
        opacity: 0 // Start invisible
      }}
    >
      {/* Image with hover zoom */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay with owner info */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F]/50 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-[#F8F5F0]">{shop.name}</h3>
          <p className="text-[#F8F5F0]/90 font-light">by {shop.owner}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F8F5F0] text-[#1A2A4F] border border-[#E0E0E0]">
            {shop.category}
          </span>
          <div className="flex items-center">
            <span className="text-[#D2B66A] text-sm">★</span>
            <span className="ml-1 text-sm text-[#5A5A5A]">{shop.rating}</span>
          </div>
        </div>

        <p className="text-sm text-[#5A5A5A] font-light line-clamp-2 mb-4">{shop.description}</p>
        
        <div className="flex justify-between items-center pt-3 border-t border-[#E0E0E0]/30">
          <span className="text-xs text-[#5A5A5A]">{shop.deliveryTime}</span>
          <div className="text-sm font-medium text-[#1A2A4F] hover:text-[#2A3A5F] transition-colors flex items-center">
            View Shop
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}