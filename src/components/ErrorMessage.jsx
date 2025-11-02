import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-6 max-w-md text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-2 font-orbitron">Oops! Something went wrong</h2>
        <p className="text-yellow-500 mb-4 font-rajdhani">{message || 'Failed to fetch data from the Star Wars API'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors font-semibold font-rajdhani"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
