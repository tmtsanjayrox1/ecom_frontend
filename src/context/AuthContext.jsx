import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    return token && userId ? { token, userId, userName } : null;
  });

  const login = (authResponse) => {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('userId', authResponse.userId);
    localStorage.setItem('userName', authResponse.name);
    setUser({ token: authResponse.token, userId: authResponse.userId, userName: authResponse.name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
