import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config";
import API from "../utils/API";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  async function login(input) {
    try {
      let user = await API.SignInWithEmailAndPassword(input);
      const { email, admin } = user.data;
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("admin", admin);
      setCurrentUser({ email, admin });
      return user;
    } catch (error) {
      setErr(error);
    }
  }

  async function getUsers() {
    try {
      return await API.GetAllMembers();
    } catch (error) {
      setErr(error);
    }
  }

  function logout() {
    try {
      return auth.signOut();
    } catch (e) {
      throw e;
    }
  }

  function resetPassword(email) {
    try {
      return auth.sendPasswordResetEmail(email);
    } catch (e) {
      throw e;
    }
  }

  function updateEmail(email) {
    try {
      return currentUser.updateEmail(email);
    } catch (e) {
      throw e;
    }
  }

  function updatePassword(password) {
    try {
      return currentUser.updatePassword(password);
    } catch (e) {
      throw e;
    }
  }

  function setError(error) {
    return setErr(error);
  }

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (e) {
      throw e;
    }
  }, []);

  const value = {
    currentUser,
    login,
    getUsers,
    setError,
    setLoading,
    err,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
