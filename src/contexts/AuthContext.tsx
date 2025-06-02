
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('npj-auth');
    if (savedAuth) {
      const userData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(userData);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Login fictício - aceita qualquer email/senha
    if (email && password) {
      const userData = { email, name: email.split('@')[0] };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('npj-auth', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('npj-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
