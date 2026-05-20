import { createContext, useContext, useState } from 'react';
import {
  login as loginRequest,
  register as registerRequest,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const register = async (credentials) => {
    const data = await registerRequest(credentials);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
