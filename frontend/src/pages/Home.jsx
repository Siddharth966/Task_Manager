import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center px-6 py-10">

      <div className="text-center text-white max-w-2xl">

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 leading-tight animate-fadeIn">
          Manage Your Tasks <br /> With Ease & Efficiency
        </h1>

        {/* Subtitle */}
        <p className="text-lg opacity-90 mb-8 animate-fadeIn delay-200">
          A simple and powerful Task Manager app to organize your daily work,
          boost productivity, and stay focused.
          Design & Developed by - <b>Siddharth Maurya</b>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8 animate-fadeIn delay-300">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold 
            hover:scale-110 hover:bg-gray-100 transition-all duration-300"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold 
            hover:scale-110 hover:bg-yellow-300 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
            <CheckCircle className="mx-auto mb-2" size={30} />
            <p className="font-semibold">Create Tasks Easily</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
            <CheckCircle className="mx-auto mb-2" size={30} />
            <p className="font-semibold">Update & Track Progress</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
            <CheckCircle className="mx-auto mb-2" size={30} />
            <p className="font-semibold">Stay Organized</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
