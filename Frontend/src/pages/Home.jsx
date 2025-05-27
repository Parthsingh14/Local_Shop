import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shops } from "../data/shop";
import Navbar from "../components/Navbar";

const heroBg =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80";

// Sample shop owner images (replace with your actual image URLs)
const ownerImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/63.jpg",
  "https://randomuser.me/api/portraits/men/82.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F5F0]">
        <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-[#E0E0E0] border-t-[#1A2A4F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Navbar Component */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[#1A2A4F]/30 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-[#F8F5F0] mb-8 tracking-tight drop-shadow-lg">
              The Local Shop
            </h1>
            <p className="text-xl md:text-2xl text-[#F8F5F0]/90 mb-12 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-md">
              Discover handcrafted goods from local artisans
            </p>
            <Link
              to="/shops"
              className="
    relative 
    inline-flex 
    items-center 
    justify-center
    px-8 py-3 
    bg-[#1A2A4F]
    text-[#F8F5F0]
    font-medium 
    rounded-lg
    overflow-hidden
    transition-all
    duration-300
    hover:bg-[#2A3A5F]
    group
    shadow-md
    hover:shadow-lg
    border border-[#1A2A4F]/90
  "
            >
              {/* Main text with cart icon integration */}
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Shops</span>

                {/* Shopping bag icon with handle animation */}
                <span className="relative">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    {/* Bag body */}
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    {/* Handle - appears on hover */}
                    <path
                      d="M16 10a4 4 0 0 1-8 0"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    ></path>
                  </svg>

                  {/* Sparkle animation using Tailwind animations */}
                  <span
                    className="
        absolute 
        -right-1 -top-1
        w-2 h-2
        bg-[#D2B66A]
        rounded-full
        opacity-0
        group-hover:opacity-80
        group-hover:animate-[ping_1s_ease-out_1]
      "
                  ></span>
                </span>
              </span>

              {/* Gold underline animation */}
              <span
                className="
    absolute 
    left-0 
    bottom-0 
    w-full 
    h-0.5 
    bg-[#D2B66A]
    transform 
    scale-x-0 
    origin-left
    group-hover:scale-x-100
    transition-transform
    duration-500
    ease-[cubic-bezier(0.19,1,0.22,1)]
  "
              ></span>

              {/* Floating dots using Tailwind animations */}
              <span
                className="
    absolute 
    left-3 top-2
    w-1.5 h-1.5 
    bg-[#F8F5F0]/80
    rounded-full
    opacity-0
    group-hover:opacity-70
    group-hover:animate-[ping_1s_ease-out_1]
  "
              ></span>
              <span
                className="
    absolute 
    right-4 bottom-2
    w-1.5 h-1.5 
    bg-[#F8F5F0]/80
    rounded-full
    opacity-0
    group-hover:opacity-70
    group-hover:animate-[ping_1s_ease-out_0.3s_1]
  "
              ></span>
              <span
                className="
    absolute 
    right-2 top-3
    w-1.5 h-1.5 
    bg-[#F8F5F0]/80
    rounded-full
    opacity-0
    group-hover:opacity-70
    group-hover:animate-[ping_1s_ease-out_0.6s_1]
  "
              ></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shopkeepers Section - Marquee Style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A4F] mb-4">
            Meet The Shop-Owners
          </h2>
          <div className="w-24 h-1 bg-[#1A2A4F] mx-auto mb-6"></div>
          <p className="text-[#5A5A5A] max-w-2xl mx-auto text-lg">
            The talented creators behind our local products
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Fades */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8F5F0] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8F5F0] to-transparent z-10"></div>

          {/* Marquee Animation */}
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {[...ownerImages, ...ownerImages].map((img, index) => (
              <div
                key={index}
                className="inline-flex flex-col items-center mx-4"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300">
                  <img
                    src={img}
                    alt={`Shop owner ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-3 text-[#1A2A4F] font-medium">
                  {shops[index % shops.length]?.owner || "Local Artisan"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Grid Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {shops.map((shop) => (
            <Link
              to={`/shop/${shop.id}`}
              key={shop.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-[#E0E0E0]/50"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A2A4F] group-hover:text-[#2A3A5F] transition-colors">
                  {shop.name}
                </h3>
                <p className="text-[#5A5A5A] mt-2">{shop.category}</p>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">{shop.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-600">{shop.deliveryTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#1A2A4F] text-[#F8F5F0]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to shop local?
          </h2>
          <div className="w-16 h-1 bg-[#F8F5F0] mx-auto mb-8"></div>
          <p className="text-xl mb-10 leading-relaxed font-light">
            Join our community supporting independent makers and small
            businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cart"
              className="px-8 py-3 rounded-lg bg-[#F8F5F0] text-[#1A2A4F] font-bold hover:bg-[#E8E5E0] transition-all duration-300 shadow-md"
            >
              View Cart
            </Link>
            <Link
              to="/info"
              className="px-8 py-3 rounded-lg border-2 border-[#F8F5F0] font-bold hover:bg-[#2A3A5F] transition-colors"
            >
              Browse More
            </Link>
          </div>
        </div>
      </section>

      {/* Add this to your CSS (or in a style tag) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
