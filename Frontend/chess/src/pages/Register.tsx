import React, { useState } from "react";
import { userauth } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const register = userauth((s) => s.register);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await register(username, email, password);

    if(success)
    {
      navigate("/login");
    }
    else{
      alert("change your credentials user already present");
      
    }    
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Animated Glow */}
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-yellow-500/20 blur-[140px] animate-pulse"></div>

      <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[150px] animate-pulse"></div>

      {/* Floating Chess Pieces */}
      <div className="absolute left-10 top-10 text-[170px] text-white animate-bounce select-none">
        ♔
      </div>

      <div className="absolute right-10 bottom-10 text-[170px] text-yellow-400 animate-bounce delay-300 select-none">
        ♛
      </div>

      <div className="absolute left-1/2 top-20 text-[120px] text-white/5 animate-pulse select-none">
        ♞
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[400px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_25px_80px_rgba(0,0,0,.8)] transition-all duration-500 hover:scale-[1.02] hover:shadow-yellow-500/30"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center text-4xl shadow-xl">
            ♟️
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-center text-white mb-2">
          Register
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Create your Chess Arena account
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40 active:scale-95"
        >
          Register
        </button>

        <p className="text-sm mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <span
            className="text-yellow-400 font-semibold cursor-pointer hover:text-yellow-300 hover:underline transition-all"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;