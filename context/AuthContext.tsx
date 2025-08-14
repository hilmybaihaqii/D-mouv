// File: context/AuthContext.tsx

import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

// Definisikan tipe untuk context kita
type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

// Buat context dengan nilai awal null
const AuthContext = createContext<AuthContextType | null>(null);

// Buat komponen Provider
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat custom hook untuk mempermudah penggunaan context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
