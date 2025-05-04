import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // adjust path if needed

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅ Get the setter from context

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
        console.log(data);

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
    <div className="h-screen p-7 flex flex-col justify-between">
      <form onSubmit={submitHandler}>
        <h3 className="text-lg font-medium mb-2">Whats your email</h3>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          placeholder="password"
        />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
          Login
        </button>
      </form>
      <p className="text-center">New Here? <Link to='/signup' className="text-blue-600">Create new Account</Link> </p>
    </div>
  );
}

export default UserLogin;
