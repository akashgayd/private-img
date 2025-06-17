import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Store token in localStorage
export const setAuthToken = (token) => {
  Cookies.set('token', token);
};

// Remove token from localStorage
export const removeAuthToken = () => {
  Cookies.remove('token');
};

// Check if token exists and is valid
export const isAuthenticated = () => {
  const token = Cookies.get('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000; // Check expiration
  } catch (err) {
    removeAuthToken();
    return false;
  }
};

// Get current user from token
export const getCurrentUser = () => {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    removeAuthToken();
    return null;
  }
};

// Login helper (stores token and returns user)
export const handleLogin = (token) => {
  setAuthToken(token);
  return getCurrentUser();
};