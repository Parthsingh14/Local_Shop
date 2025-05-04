import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shops?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-[#1A2A4F] text-[#F8F5F0] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2 text-[#F8F5F0]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <span className="text-xl font-bold tracking-wide text-[#F8F5F0]">
                The Local Shop
              </span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link 
                to="/shops" 
                className="border-[#F8F5F0] text-[#F8F5F0] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors hover:border-[#E0E0E0] hover:text-[#E0E0E0]"
              >
                All Shops
              </Link>
            </div>
          </div>

          {/* Right side elements */}
          <div className="flex items-center">
            {/* Search Bar (Desktop) */}
            <form 
              onSubmit={handleSearch}
              className="hidden sm:flex items-center max-w-xs mx-4"
            >
              <div className="relative rounded-md shadow-sm w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-[#5A5A5A]" />
                </div>
                <input
                  type="text"
                  placeholder="Search shops..."
                  className="focus:ring-[#1A2A4F] focus:border-[#1A2A4F] block w-full pl-10 pr-3 py-2 border border-[#E0E0E0] bg-[#F8F5F0] text-[#1A2A4F] rounded-md text-sm placeholder-[#5A5A5A]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* User Profile */}
            <div className="ml-4 relative">
              {user ? (
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                    <div className="h-8 w-8 rounded-full bg-[#F8F5F0] text-[#1A2A4F] flex items-center justify-center">
                      <FiUser className="h-4 w-4" />
                    </div>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-[#5A5A5A] hover:bg-[#F8F5F0]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#5A5A5A] hover:bg-[#F8F5F0] flex items-center"
                      >
                        <FiLogOut className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/" 
                  className="text-sm font-medium text-[#F8F5F0] hover:text-[#E0E0E0]"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6 relative">
              <Link 
                to="/cart" 
                className="group -m-2 p-2 flex items-center hover:text-[#E0E0E0] transition-colors"
              >
                <FiShoppingCart className="h-6 w-6 text-[#F8F5F0] group-hover:text-[#E0E0E0]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F8F5F0] text-[#1A2A4F] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden -mr-2 inline-flex items-center justify-center p-2 rounded-md text-[#F8F5F0] hover:text-[#E0E0E0] hover:bg-[#2A3A5F] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#2A3A5F]">
          <div className="pt-2 pb-4 space-y-2 px-4">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiSearch className="h-4 w-4 text-[#5A5A5A]" />
                </div>
                <input
                  type="text"
                  placeholder="Search shops..."
                  className="focus:ring-[#1A2A4F] focus:border-[#1A2A4F] block w-full pl-10 pr-3 py-2 border border-[#E0E0E0] bg-[#F8F5F0] text-[#1A2A4F] rounded-md text-sm placeholder-[#5A5A5A]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <Link
              to="/shops"
              className="block py-2 px-3 text-base font-medium text-[#F8F5F0] hover:bg-[#3A4A6F] hover:text-[#E0E0E0] rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Shops
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-base font-medium text-[#F8F5F0] hover:bg-[#3A4A6F] hover:text-[#E0E0E0] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block py-2 px-3 text-base font-medium text-[#F8F5F0] hover:bg-[#3A4A6F] hover:text-[#E0E0E0] rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-3 text-base font-medium text-[#F8F5F0] hover:bg-[#3A4A6F] hover:text-[#E0E0E0] rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            
            <Link
              to="/cart"
              className="flex items-center py-2 px-3 text-base font-medium text-[#F8F5F0] hover:bg-[#3A4A6F] hover:text-[#E0E0E0] rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiShoppingCart className="mr-2 h-5 w-5" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-auto bg-[#F8F5F0] text-[#1A2A4F] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}