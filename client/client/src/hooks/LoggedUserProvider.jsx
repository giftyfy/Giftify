import React, { createContext, useContext, useState } from 'react';

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

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
