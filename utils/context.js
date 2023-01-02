import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
  });

  function login(accessToken, refreshToken) {
    api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
    setAuthState({ accessToken, refreshToken });
  }

  function logout() {
    setAuthState({ accessToken: null, refreshToken: null });
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
