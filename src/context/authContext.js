import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [signedIn, setSignedIn] = useState(null);

  const login = (email, password) => {
    setSignedIn(true);
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    setSignedIn(false);
    return auth.signOut();
  };
  /*
This sets & saves the Verified User in our context after logging In
useEffect takes this action after the component has been mounted

Login email = "admin@sidu-ed.com"
Password = "123456"
*/
  const unsuscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    if (user == null || undefined) {
      setSignedIn(false);
    } else {
      return setSignedIn(true);
    }
  });

  useEffect(() => {
    return unsuscribe;
  });

  const value = {
    currentUser,
    signedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
