import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};