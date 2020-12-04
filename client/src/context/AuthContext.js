import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    setCurrentUser({ email, password });
    return auth.signInWithEmailAndPassword(email, password);
  }

  // function getUsers() {
  //   let arr = [];
  //   return db.getInstance();
    // db.ref().on("value", (snapshot) => {
    //   let obj = snapshot.val().members;
    //   for (var key in obj) {
    //     arr.push({ email: obj[key].email, name: obj[key].name, _id: key });
    //   }
    // });
    // return arr;
  // }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    getUsers,
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
