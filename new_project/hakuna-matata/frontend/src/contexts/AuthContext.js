import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Export everything at the top to avoid any order issues
export { AuthContext };

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Storage keys
  const USERS_KEY = 'hakunaMatataUsers';
  const CURRENT_KEY = 'hakunaCurrentUser';

  // Load current user from localStorage (client-side auth). If none, no user is logged in.
  useEffect(() => {
    console.log('AuthProvider mounted - loading current user from localStorage...');
    const stored = localStorage.getItem(CURRENT_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setCurrentUser(user);
        console.log('✅ Loaded current user:', user.email || user.name);
      } catch (err) {
        console.warn('Failed to parse current user, clearing key', err);
        localStorage.removeItem(CURRENT_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Register a new user client-side. Stores users under USERS_KEY in localStorage.
  // Password is stored as a simple base64 string (NOT secure) for demo purposes.
  const register = async (email, password, name) => {
    setLoading(true);
    try {
      if (!email || !password) {
        setLoading(false);
        return { success: false, error: 'Email and password are required' };
      }

      const normalized = email.toLowerCase().trim();
      const rawUsers = localStorage.getItem(USERS_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];

      if (users.find(u => u.email === normalized)) {
        setLoading(false);
        return { success: false, error: 'User already exists' };
      }

      const newUser = {
        id: Date.now().toString(),
        email: normalized,
        name: name ? name.trim() : normalized.split('@')[0],
        password: btoa(password), // simple encoding for demo only
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Set as current user (do not persist current user unless login used remember)
      setCurrentUser({ id: newUser.id, email: newUser.email, name: newUser.name });
      setLoading(false);
      console.log('✅ Registered new user:', newUser.email);
      return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
    } catch (error) {
      console.error('❌ Registration error:', error);
      setLoading(false);
      return { success: false, error: 'Registration failed' };
    }
  };

  // Login client-side: check USERS_KEY for a matching email/password. If remember
  // is true, persist the current user under CURRENT_KEY so session survives reload.
  const login = async (email, password, remember = false) => {
    setLoading(true);
    try {
      const normalized = email.toLowerCase().trim();
      const rawUsers = localStorage.getItem(USERS_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];

      const found = users.find(u => u.email === normalized);
      if (!found) {
        setLoading(false);
        return { success: false, error: 'No account found. Please register first.' };
      }

      if (found.password !== btoa(password)) {
        setLoading(false);
        return { success: false, error: 'Invalid email or password' };
      }

      const user = { id: found.id, email: found.email, name: found.name };
      setCurrentUser(user);

      if (remember) {
        localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
      }

      setLoading(false);
      console.log('✅ Login successful:', user.email);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_KEY);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default export
export default AuthContext;