import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUer] = useState();
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    console.log(email, password);
    return auth.signInWithEmailAndPasswords(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUer(user);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
