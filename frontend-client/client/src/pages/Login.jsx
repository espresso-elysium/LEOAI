// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <--- this is required
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        
        navigate("/leo"); // Redirect to a protected route
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-purple-200 p-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-4 ring-blue-200 shadow-lg mb-2">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 focus:bg-purple-50 focus:ring-offset-2 transition sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 focus:bg-purple-50 focus:ring-offset-2 transition sm:text-sm"
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
          />
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 font-semibold">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

       
        <p className="mt-8 text-center text-gray-600">
  Don't have an account?
  <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"> Sign up</Link>
</p>
      </div>
    </div>
  );
}
