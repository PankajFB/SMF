import { createContext, useContext, useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

// creating the fireabse context
const FirebaseContext = createContext(null);

// using the firebase context
export const useFirebase = () => useContext(FirebaseContext);

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD_W_CNaapxawvHkfQMoi33M2X9thYHQ_w",
  authDomain: "webapp-a3878.firebaseapp.com",
  projectId: "webapp-a3878",
  storageBucket: "webapp-a3878.appspot.com",
  messagingSenderId: "460892839591",
  appId: "1:460892839591:web:ce56fd400f35aa16b50582",
  measurementId: "G-VNQ2SSEFHL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Authentication and get a reference to the service
export const googleProvider = new GoogleAuthProvider();

// provider component for firebase
export const FirebaseProvider = (props) => {
  const [singedInUser, setSingedInUser] = useState({});

  const signupUserWithEmailandPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUserWithEmailandPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
      onAuthStateChanged(auth, (singedInUser) => {
        if (singedInUser) {
         console.log("User is signed in");
         console.log(singedInUser.email);
         setSingedInUser(singedInUser)
        }
        else{
          console.log("User is logged out");
          setSingedInUser(null)
        }
      }
      )
    
    },[auth,singedInUser,setSingedInUser])

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        googleProvider,
        singedInUser,
        setSingedInUser,
        signupUserWithEmailandPassword,
        signInUserWithEmailandPassword
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
