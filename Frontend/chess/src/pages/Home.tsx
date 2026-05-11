import React from "react";
import { useNavigate } from "react-router-dom";
import { userauth } from "../store/auth.store";

const Home = () => {
  const navigate = useNavigate();
  const user = userauth((s) => s.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white">

      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">♟️ Chess Arena</h1>

      <p className="mb-10 text-gray-300 text-lg">
        Play real-time chess with players online
      </p>

      {/* Chess Image */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/ChessBoard480.svg/480px-ChessBoard480.svg.png"
        alt="Chess"
        className="w-60 h-60 mb-10 rounded-lg shadow-lg"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/chess")}
            className="px-8 py-3 bg-green-500 rounded-lg hover:bg-green-600"
          >
            ▶ Play Now
          </button>
        )}
      </div>

    </div>
  );
};

export default Home;