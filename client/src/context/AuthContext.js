import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    try {
      setCurrentUser({ email, password });
      return auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err);
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
    } catch (err) {
      setError(err);
    }
  }

  function resetPassword(email) {
    try {
      return auth.sendPasswordResetEmail(email);
    } catch (err) {
      setError(err);
    }
  }

  function updateEmail(email) {
    try {
      return currentUser.updateEmail(email);
    } catch (err) {
      setError(err);
    }
  }

  function updatePassword(password) {
    try {
      return currentUser.updatePassword(password);
    } catch (err) {
      setError(err);
    }
  }

  function setErr(err) {
    return setError(err);
  }

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      setError(err);
    }
  }, []);

  const value = {
    currentUser,
    login,
    getUsers,
    setErr,
    error,
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
