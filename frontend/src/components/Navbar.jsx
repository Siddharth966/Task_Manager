import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition-all duration-300"
        >
          Task Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {user ? (
            <>
              <span className="text-white flex items-center gap-2">
                <User size={18} />
                {user?.name || "User"}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-xl 
                bg-white/20 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 
                hover:scale-105 active:scale-95
                transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
             <Link
                to="/"
               className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500
                hover:text-white hover:scale-110 active:scale-95 
                transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/login"
               className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500
                hover:text-white hover:scale-110 active:scale-95 
                transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl
                hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500
                hover:text-white hover:scale-110 active:scale-95 
                transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white transition-transform duration-300 hover:scale-110"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-500 text-white px-4 py-4 space-y-4 animate-fadeIn">

          {user ? (
            <>
              <div className="flex items-center gap-2 text-lg">
                <User size={18} />
                {user?.name || "User"}
              </div>

              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 
                bg-white/20 text-white px-4 py-2 rounded-xl
                hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600
                hover:scale-105 active:scale-95 
                transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
            <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block py-2 text-white border-b border-white/20
                hover:text-green-300 hover:scale-105 transition-all duration-300"
              > 
                Home
              </Link>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-white border-b border-white/20 
                hover:text-gray-200 hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block py-2 text-white border-b border-white/20
                hover:text-green-300 hover:scale-105 transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
