import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config";

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
  function login(email, password) {
    try {
      setCurrentUser({ email, password });
      return auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setErr(error);
    }
  }

  function getUsers() {
    let arr = [];
    db.getInstance();
    db.ref().on("value", (snapshot) => {
      let obj = snapshot.val().members;
      for (var key in obj) {
        arr.push({ email: obj[key].email, name: obj[key].name, _id: key });
      }
    });
    return arr;
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
