import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, removeCookie } from '../utils/cookieUtils';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const LoggedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const storedToken = getCookie('userToken');
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);
  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
