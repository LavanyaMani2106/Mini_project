import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Export everything at the top to avoid any order issues
export { AuthContext };

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a consistent key
  const STORAGE_KEY = 'hakunaMatataUser';

  // Check for existing user on app start
  useEffect(() => {
    console.log('🔍 AuthProvider mounted - checking localStorage...');
    const storedUser = localStorage.getItem(STORAGE_KEY);
    console.log('📦 Raw data from localStorage:', storedUser);
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('✅ User parsed successfully:', user);
        setCurrentUser(user);
      } catch (error) {
        console.error('❌ Error parsing user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      console.log('❌ No user found in localStorage for key:', STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  // Register function with better debugging
  const register = async (email, password, name) => {
    console.log('📝 REGISTER called with:', { email, name });
    setLoading(true);
    
    try {
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(), // Normalize email
        name: name.trim(),
        createdAt: new Date().toISOString()
      };

      console.log('👤 New user object:', newUser);
      
      // Store in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      console.log('💾 Saved to localStorage with key:', STORAGE_KEY);
      
      // Verify it was saved
      const verifySave = localStorage.getItem(STORAGE_KEY);
      console.log('🔍 Verification - retrieved after save:', verifySave);
      
      // Update state
      setCurrentUser(newUser);
      console.log('✅ Registration completed - currentUser set to:', newUser);
      
      setLoading(false);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Registration error:', error);
      setLoading(false);
      return { success: false, error: 'Registration failed' };
    }
  };

  // Login function with better debugging
  const login = async (email, password) => {
    console.log('🔐 LOGIN called with:', { email, password });
    setLoading(true);
    
    try {
      const normalizedEmail = email.toLowerCase().trim();
      
      // Check localStorage
      const storedUser = localStorage.getItem(STORAGE_KEY);
      console.log('📦 Retrieved from localStorage:', storedUser);
      
      if (!storedUser) {
        console.log('❌ No user data found in localStorage for key:', STORAGE_KEY);
        setLoading(false);
        return { success: false, error: 'No account found. Please register first.' };
      }

      const user = JSON.parse(storedUser);
      console.log('👤 Parsed user:', user);
      console.log('🔍 Comparing emails - Stored:', user.email, 'Input:', normalizedEmail);
      
      if (user.email === normalizedEmail) {
        console.log('✅ Email matches - login successful');
        setCurrentUser(user);
        setLoading(false);
        return { success: true, user };
      } else {
        console.log('❌ Email mismatch');
        setLoading(false);
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user');
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
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