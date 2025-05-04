import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data.user); 
        navigate("/user-home");
      } else if (response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8">
        {/* Branding Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A2A4F] mb-2">Local-Shop</h1>
          <p className="text-[#5A5A5A] italic">
            "Support your community - Shop local, strengthen neighborhoods"
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
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
              Password
            </label>
            <input
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#1A2A4F]/30 focus:outline-none focus:ring-2 focus:ring-[#1A2A4F]/50 focus:border-transparent"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A2A4F] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1A2A4F]/90 transition-colors duration-200 shadow-md"
          >
            Sign in to your account
          </button>

          <div className="text-center text-sm text-[#5A5A5A]">
            <p>
              New to Local-Shop?{" "}
              <Link 
                to="/signup" 
                className="font-medium text-[#1A2A4F] hover:text-[#1A2A4F]/80 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;