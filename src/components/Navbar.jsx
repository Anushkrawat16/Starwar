import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';

function Navbar({ searchQuery, onSearchChange, isAuthenticated, username, onLoginClick, onLogout }) {
  return (
    <nav className="relative bg-black py-8 border-b border-yellow-400/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-4xl text-yellow-400 animate-twinkle">✦</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 font-orbitron tracking-wider uppercase">
              STAR WARS
            </h1>
            <span className="text-4xl text-yellow-400 animate-twinkle">✦</span>
          </div>
          <p className="text-lg md:text-xl text-gray-300 font-rajdhani">
            Explore the Galaxy's Most Iconic Characters
          </p>
        </div>
        
        <div className="flex justify-end mb-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-yellow-400 font-rajdhani">
                <User className="h-4 w-4" />
                <span>{username}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-yellow-400 rounded-lg hover:bg-gray-700 transition-colors font-rajdhani"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-orbitron font-bold"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          )}
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search characters by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-6 py-3 pl-12 rounded-lg border border-yellow-400/50 bg-gray-900/50 backdrop-blur-sm text-yellow-400 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-black transition-all"
            />
            <span className="absolute left-4 top-3.5 text-yellow-400 text-xl">🔍</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
