import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, X } from 'lucide-react';
import { login } from '../services/auth';

function Login({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        onLoginSuccess(result.username);
        onClose();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-orbitron font-bold text-yellow-400 flex items-center gap-2">
            <LogIn className="h-6 w-6" />
            Login
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-rajdhani text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
              placeholder="admin, user, or luke"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-rajdhani text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
              placeholder="password123, user123, or skywalker"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-rajdhani">{error}</div>
          )}

          <div className="text-xs text-gray-400 font-rajdhani space-y-1">
            <p>Demo Credentials:</p>
            <p>• admin / password123</p>
            <p>• user / user123</p>
            <p>• luke / skywalker</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-yellow-400 text-black font-orbitron font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;

