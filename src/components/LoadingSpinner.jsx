import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-yellow-500/50 rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
      </div>
      <p className="ml-4 text-xl font-semibold text-yellow-400 font-rajdhani">Loading characters...</p>
    </div>
  );
}

export default LoadingSpinner;
