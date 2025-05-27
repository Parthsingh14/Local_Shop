import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FiArrowLeft, FiStar, FiClock, FiSearch, FiX, FiFilter } from 'react-icons/fi';
import { shops } from '../data/shop';
import { products } from '../data/product';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const { shopId } = useParams();
  const { cartItems, addToCart } = useCart();
  const [shop, setShop] = useState(null);
  const [shopProducts, setShopProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const foundShop = shops.find(s => s.id === parseInt(shopId));
    setShop(foundShop);
    const foundProducts = products.filter(p => p.shopId === parseInt(shopId));
    setShopProducts(foundProducts);
    setReviews([
      { id: 1, user: 'Rahul K.', rating: 5, comment: 'Great quality products!', date: '2023-05-15' },
      { id: 2, user: 'Priya M.', rating: 4, comment: 'Fast delivery, good packaging', date: '2023-04-28' }
    ]);
  }, [shopId]);

  const categories = ['all', ...new Set(shopProducts.map(p => p.category))];
  const maxPrice = Math.max(...shopProducts.map(p => p.price), 1000);

  const filteredProducts = shopProducts.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: 'Current User',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
  };

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F5F0]">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-[#1A2A4F]">Shop not found</h2>
          <Link 
            to="/shops" 
            className="mt-4 inline-block px-6 py-2 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors"
          >
            Browse Shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5F0] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button and shop header */}
        <div className="mb-8">
          <Link 
            to="/shops" 
            className="flex items-center text-[#1A2A4F] hover:text-[#2A3A5F] mb-6 group transition-colors"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Shops
          </Link>

          <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow-sm">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-square overflow-hidden rounded-xl shadow-sm">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#1A2A4F] mb-2">{shop.name}</h1>
              <p className="text-[#5A5A5A] mb-4 font-light">by {shop.owner}</p>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center bg-[#F8F5F0] px-3 py-1 rounded-full border border-[#E0E0E0]">
                  <FiStar className="text-[#D2B66A] mr-1" />
                  <span className="font-medium text-[#1A2A4F]">{shop.rating} ({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center bg-[#F8F5F0] px-3 py-1 rounded-full border border-[#E0E0E0]">
                  <FiClock className="text-[#5A5A5A] mr-1" />
                  <span className="font-medium text-[#1A2A4F]">{shop.deliveryTime}</span>
                </div>
                <span className="bg-[#F8F5F0] text-[#1A2A4F] px-3 py-1 rounded-full text-sm font-medium border border-[#E0E0E0]">
                  {shop.category}
                </span>
              </div>

              <p className="text-[#5A5A5A] font-light mb-6">{shop.description}</p>
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A5A5A]" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#1A2A4F] bg-white/90"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 bg-[#F8F5F0] hover:bg-[#E0E0E0]/50 rounded-lg transition-colors border border-[#E0E0E0]"
            >
              <FiFilter className="mr-2 text-[#1A2A4F]" />
              <span className="text-[#1A2A4F]">Filters</span>
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[#F8F5F0] rounded-lg border border-[#E0E0E0]">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1A2A4F] mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#1A2A4F]"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1A2A4F]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === category 
                        ? 'bg-[#1A2A4F] text-[#F8F5F0]' 
                        : 'bg-white text-[#5A5A5A] hover:bg-[#E0E0E0]/50 border border-[#E0E0E0]'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products section */}
        <div className="mb-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                return (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    shopName={shop.name}
                    initialQuantity={cartItem?.quantity || 0}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-[#1A2A4F]">No products found</h3>
              <p className="text-[#5A5A5A] mt-2 font-light">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setPriceRange([0, maxPrice]);
                }}
                className="mt-4 px-4 py-2 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1A2A4F] mb-6">Customer Reviews</h2>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-[#E0E0E0]">
            <h3 className="text-lg font-medium text-[#1A2A4F] mb-4">Write a Review</h3>
            <form onSubmit={handleAddReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1A2A4F] mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="text-2xl focus:outline-none"
                    >
                      <FiStar className={`${star <= newReview.rating ? 'text-[#D2B66A] fill-[#D2B66A]' : 'text-[#E0E0E0]'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1A2A4F] mb-2">Comment</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-[#1A2A4F] focus:border-[#1A2A4F]"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 border border-[#E0E0E0]">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`${i < review.rating ? 'text-[#D2B66A] fill-[#D2B66A]' : 'text-[#E0E0E0]'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#5A5A5A]">{review.date}</span>
                </div>
                <h4 className="font-medium text-[#1A2A4F] mb-1">{review.user}</h4>
                <p className="text-[#5A5A5A] font-light">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-[#1A2A4F]">{selectedProduct.name}</h2>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-[#5A5A5A] hover:text-[#1A2A4F]"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-full md:w-1/2">
                    <div className="aspect-square bg-[#F8F5F0] rounded-lg overflow-hidden">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-[#5A5A5A] font-light mb-4">{selectedProduct.description}</p>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-[#1A2A4F]">₹{selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="ml-2 text-sm text-[#5A5A5A] line-through">₹{selectedProduct.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-2">
                        <FiStar className="text-[#D2B66A] fill-[#D2B66A]" />
                        <span className="ml-1 font-medium text-[#1A2A4F]">{shop.rating}</span>
                      </div>
                      <span className="text-sm text-[#5A5A5A]">{shop.deliveryTime} delivery</span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full py-3 px-4 bg-[#1A2A4F] text-[#F8F5F0] rounded-lg hover:bg-[#2A3A5F] transition-colors flex items-center justify-center"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {selectedProduct.details && (
                  <div className="border-t border-[#E0E0E0] pt-4">
                    <h3 className="font-medium text-[#1A2A4F] mb-2">Product Details</h3>
                    <ul className="list-disc pl-5 text-[#5A5A5A] font-light">
                      {selectedProduct.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}