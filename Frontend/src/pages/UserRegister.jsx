import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        newUser
      );
  
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside 2xx
        console.error("Registration failed:", error.response.data);
      } else if (error.request) {
        // The request was made but no response received
        console.error("No response from server:", error.request);
      } else {
        // Something else happened
        console.error("Error:", error.message);
      }
    }
  
    setEmail("");
    setPassword("");
    setUserName("");
  };
  

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8">
        {/* Branding Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A2A4F] mb-2">Local-Shop</h1>
          <p className="text-[#5A5A5A] italic">
            "Join our community - Empower local businesses together"
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#5A5A5A] mb-1">
              Your Name
            </label>
            <input
              id="username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#1A2A4F]/30 focus:outline-none focus:ring-2 focus:ring-[#1A2A4F]/50 focus:border-transparent"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5A5A5A] mb-1">
              Email address
            </label>
            <input
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#1A2A4F]/30 focus:outline-none focus:ring-2 focus:ring-[#1A2A4F]/50 focus:border-transparent"
              type="email"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5A5A5A] mb-1">
              Create Password
            </label>
            <input
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#1A2A4F]/30 focus:outline-none focus:ring-2 focus:ring-[#1A2A4F]/50 focus:border-transparent"
              type="password"
              placeholder="Choose a secure password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A2A4F] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1A2A4F]/90 transition-colors duration-200 shadow-md"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-[#5A5A5A]">
            <p>
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-[#1A2A4F] hover:text-[#1A2A4F]/80 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>

        {/* Footer with copyright and terms */}
        <div className="mt-8 pt-6 border-t border-[#1A2A4F]/10 text-xs text-[#5A5A5A] text-center">
          <p>© {new Date().getFullYear()} Local-Shop. All rights reserved.</p>
          <p className="mt-2">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-[#1A2A4F] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#1A2A4F] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-1">
            Local-Shop is a platform dedicated to supporting neighborhood businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;