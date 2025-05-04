import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import AllShopsPage from "./pages/AllShopsPage";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import KnowMore from "./pages/KnowMore";
import UserLogin from "./pages/UserLogin";

import Testing from "./pages/Testing";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeInUp {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
      }
      
      /* Custom delay classes */
      .animate-delay-100 { animation-delay: 100ms; }
      .animate-delay-200 { animation-delay: 200ms; }
      .animate-delay-300 { animation-delay: 300ms; }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50">
            <ScrollToTop />
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/testing" element={<Testing />} />{" "}
                {/* Testing route */}
                <Route path="/" element={<UserLogin />} />
                <Route path="/user-home" element={<Home />} />
                <Route path="/shops" element={<AllShopsPage />} />
                <Route path="/shop/:shopId" element={<ShopPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/info" element={<KnowMore />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
