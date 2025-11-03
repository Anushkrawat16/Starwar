import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Star } from 'lucide-react';
import { login, isAuthenticated } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        // Navigate to main app
        navigate('/');
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
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                           radial-gradient(2px 2px at 60px 70px, rgba(255,255,255,0.8), transparent),
                           radial-gradient(1px 1px at 50px 50px, #fff, transparent),
                           radial-gradient(1px 1px at 20px 80px, rgba(255,255,255,0.6), transparent),
                           radial-gradient(2px 2px at 90px 40px, #fff, transparent),
                           radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.4), transparent)`,
          backgroundSize: '200px 200px',
          animation: 'twinkle 3s infinite',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/90 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="h-8 w-8 text-yellow-400 animate-twinkle" />
              <h1 className="text-4xl font-orbitron font-bold text-yellow-400">
                STAR WARS
              </h1>
              <Star className="h-8 w-8 text-yellow-400 animate-twinkle" />
            </div>
            <h2 className="text-2xl font-orbitron font-bold text-yellow-400 flex items-center justify-center gap-2 mb-2">
              <LogIn className="h-6 w-6" />
              Login to Explore
            </h2>
            <p className="text-gray-300 font-rajdhani">
              Enter your credentials to access the galaxy
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-rajdhani text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                placeholder="Enter username"
                required
                autoFocus
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
                className="w-full px-4 py-3 rounded-lg border border-yellow-400/50 bg-gray-900/80 backdrop-blur-sm text-yellow-400 placeholder:text-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm font-rajdhani bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
              <p className="text-xs text-yellow-400 font-rajdhani font-bold mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-300 font-rajdhani space-y-1">
                <p>• admin / password123</p>
                <p>• user / user123</p>
                <p>• luke / skywalker</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-yellow-400 text-black font-orbitron font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;

