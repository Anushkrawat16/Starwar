const MOCK_USERS = {
  'admin': 'password123',
  'user': 'user123',
  'luke': 'skywalker',
};

function generateToken(username) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    username,
    iat: Date.now(),
    exp: Date.now() + (60 * 60 * 1000),
  }));
  return `${header}.${payload}.${btoa('mock-secret-key')}`;
}

function decodeToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() > payload.exp;
}

export async function login(username, password) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (MOCK_USERS[username] === password) {
    const token = generateToken(username);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('username', username);
    return { success: true, token, username };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');
  return { success: true };
}

export function isAuthenticated() {
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  
  if (isTokenExpired(token)) {
    logout();
    return false;
  }
  
  return true;
}

export function getCurrentUser() {
  const token = localStorage.getItem('auth_token');
  if (!token || isTokenExpired(token)) {
    logout();
    return null;
  }
  
  const payload = decodeToken(token);
  return payload ? { username: payload.username } : null;
}

export function refreshToken() {
  const token = localStorage.getItem('auth_token');
  if (!token) return null;
  
  const payload = decodeToken(token);
  if (!payload) return null;
  
  const expiresIn = payload.exp - Date.now();
  if (expiresIn < 5 * 60 * 1000) {
    const newToken = generateToken(payload.username);
    localStorage.setItem('auth_token', newToken);
    return newToken;
  }
  
  return token;
}

export function startTokenRefresh() {
  const interval = setInterval(() => {
    if (isAuthenticated()) {
      refreshToken();
    } else {
      clearInterval(interval);
    }
  }, 60 * 1000);
  
  return interval;
}

