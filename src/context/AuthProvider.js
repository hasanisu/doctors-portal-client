import React from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [theme, setTheme] = useState("light")

    const toggleTheme=()=>{
        setTheme((curr)=> (curr === "light" ? "dark" : "light"))
      }

    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle =()=>{
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile =(userInfo)=>{
        return updateProfile (auth.currentUser, userInfo);
    }

    const logOut = ()=>{
        setLoading(true);
        localStorage.removeItem("accessToken")
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser=>{
            console.log('user Observing')
            setUser(currentUser);
            setLoading(false)
        }));
        return () => unsubscribe()
    }, []) 


    const authInfo={
        createUser,
        signInUser,
        logOut,
        updateUserProfile,
        signInWithGoogle,
        user,
        loading,
        theme,
        setTheme,
        toggleTheme
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;