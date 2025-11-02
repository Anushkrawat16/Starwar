import React from 'react';

function Navbar({ searchQuery, onSearchChange }) {
  return (
    <nav className="relative bg-black py-8 border-b border-yellow-400/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
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
        
        {/* Search Bar */}
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
