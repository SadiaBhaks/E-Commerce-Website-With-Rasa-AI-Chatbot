import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    console.log("🔹 Trying to login with:", { email, password }); 

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      console.log("🔹 Response status:", res.status); 

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("❌ Failed to parse JSON:", jsonErr);
        setError("Invalid response from server.");
        return;
      }

      console.log("🔹 Response data:", data); 

      if (res.ok) {
        console.log("✅ Login Success:", data);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <section
      id="Registration"
      className="relative w-full h-screen flex items-center justify-center bg-gray-900"
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1663850873201-de1c8c3d60ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

     
      <div className="absolute inset-0 bg-black/60"></div>

      
      <div className="relative z-10 bg-transparent rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
         
          <div>
            <label className="block text-white mb-3">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-5 focus:ring-2 focus:ring-blue-500 outline-none bg-white backdrop-blur-md shadow-[0_0_20px_#3b82f6]"
              required
            />
          </div>

         
          <div>
            <label className="block text-white mb-3">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-5 focus:ring-2 focus:ring-blue-500 outline-none bg-white backdrop-blur-md shadow-[0_0_20px_#3b82f6]"
              required
            />
          </div>

         
          <button
            type="submit"
            className="w-40 mx-auto block bg-blue-900 text-white py-3 mt-10 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="bg-transparent w-60 mx-auto block mt-10">
          <h1 className="text-white">New to Taste_Trove Marketplace?</h1>
          <button
            onClick={() => navigate("/register")}
            className="bg-transparent text-white font-semibold text-xl mx-auto block mt-4 hover:text-blue-700"
          >
            Register here
          </button>
        </div>
      </div>
    </section>
  );
}
