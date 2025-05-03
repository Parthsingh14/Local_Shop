import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shops } from '../data/shop';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';

export default function AllShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Get unique categories
  const categories = ['all', ...new Set(shops.map(shop => shop.category))];

  // Filter shops based on search and category
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         shop.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || shop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F5F0] p-4 sm:p-6">
      {/* Header with back button */}
      <header className="mb-8 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#1A2A4F] hover:text-[#2A3A5F] transition-colors group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A2A4F] mt-6 mb-2">All Campus Shops</h1> 
        <p className="text-[#5A5A5A] font-light">Browse all local vendors and artisans</p>
      </header>

      {/* Search and Filter Bar */}
      <div className="mb-8 sticky top-0 bg-[#F8F5F0]/80 backdrop-blur-sm p-4 rounded-xl z-10 max-w-7xl mx-auto">
        <div className="relative max-w-md mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A5A5A]" />
          <input
            type="text"
            placeholder="Search shops or owners..."
            className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#1A2A4F] focus:border-[#1A2A4F] bg-white/90"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category 
                  ? 'bg-[#1A2A4F] text-[#F8F5F0] shadow-md' 
                  : 'bg-white text-[#5A5A5A] hover:bg-[#E0E0E0]/50 border border-[#E0E0E0]'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Shops Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map(shop => (
              <Link 
                to={`/shop/${shop.id}`} 
                key={shop.id}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{shop.name}</h3>
                    <p className="text-white/90 font-light">{shop.owner}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F8F5F0] text-[#1A2A4F] border border-[#E0E0E0]">
                      {shop.category}
                    </span>
                    <div className="flex items-center">
                      <span className="text-[#D2B66A]">★</span>
                      <span className="ml-1 text-[#5A5A5A]">{shop.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#5A5A5A] font-light line-clamp-2 mb-4">{shop.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-[#E0E0E0]/50">
                    <span className="text-sm text-[#5A5A5A]">{shop.deliveryTime}</span>
                    <button className="text-[#1A2A4F] hover:text-[#2A3A5F] font-medium flex items-center group">
                      View Shop
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-[#1A2A4F]">No shops found</h3>
            <p className="text-[#5A5A5A] mt-3 font-light">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-6 px-6 py-2.5 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}