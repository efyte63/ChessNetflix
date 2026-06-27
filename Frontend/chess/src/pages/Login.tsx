import React, { useState } from "react";
import { userauth } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const login = userauth((state) => state.login);
  const User = userauth((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);

      if(User == null)
      {
        alert("user not found type right credentials")
      }
      else{
        navigate("/netflix");
      }

      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-yellow-500/20 blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-green-500/20 blur-[150px] animate-pulse"></div>

      {/* Floating Chess Pieces */}
      <div className="absolute left-10 top-10 text-white/10 text-[180px] animate-bounce select-none">
        ♔
      </div>

      <div className= "absolute left-1/3 bottom-16 text-yellow-500 text-[120px] animate-pulse select-none">
        ♞
      </div>

      <div className= "absolute right-10 bottom-10 text-white/10 text-[180px] animate-bounce delay-300 select-none" >
        ♜
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] w-[380px] transition-all duration-500 hover:scale-[1.02] hover:shadow-yellow-500/20"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center text-4xl shadow-lg">
            ♟️
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-center text-white mb-2">
          Login
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Continue your chess journey
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-5 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-7 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 active:scale-95 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <span
            className="text-yellow-400 font-semibold cursor-pointer hover:text-yellow-300 hover:underline transition-all"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;