import React from "react";
import { useNavigate } from "react-router-dom";
import { userauth } from "../store/auth.store";

const Home = () => {
  const navigate = useNavigate();
  const user = userauth((s) => s.user);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop)",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Decorative Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative z-10 w-[92%] max-w-6xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">

          {/* Left */}
          <div className="p-10 md:p-16">

            <span className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm mb-6">
              ♛ Welcome to Chess Arena
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
              Master the
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
                Game of Kings
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-lg">
              Challenge players from around the world in exciting real-time
              chess matches. Improve your strategy, sharpen your tactics, and
              climb the leaderboard.
            </p>

            <div className="flex gap-4 mt-10">
              {!user ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:scale-105 hover:shadow-yellow-500/40 transition-all duration-300"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/chess")}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-green-500/40 transition-all duration-300"
                >
                  ▶ Play Now
                </button>
              )}
            </div>

            <div className="flex gap-8 mt-12 text-gray-300">
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">∞</h2>
                <p>Unlimited Matches</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-400">⚡</h2>
                <p>Real-Time Play</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-400">🏆</h2>
                <p>Competitive</p>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="hidden md:flex justify-center items-center p-10 relative">

            <div className="absolute w-80 h-80 rounded-full bg-yellow-500/20 blur-3xl" />

            <img
              src="https://i.pinimg.com/736x/1c/24/ee/1c24eed28b75e49650bc92c4402cba21.jpg"
              alt="Chess Board"
              className="relative w-[420px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:rotate-2 hover:scale-105 transition-all duration-500"
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;