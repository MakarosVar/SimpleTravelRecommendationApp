import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  me,
  login as loginRequest,
  register as registerRequest,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem('token'),
  );
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    async function validateSession() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const currentUser = await me();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    validateSession();
  }, [token]);
  const login = async (credentials) => {
    const data = await loginRequest(credentials);

    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const register = async (credentials) => {
    const data = await registerRequest(credentials);

    setUser(data);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
