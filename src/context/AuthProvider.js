import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const createUser =(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signinUser = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile =(userInfo)=>{
        return updateUserProfile(user, userInfo);
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser=>{
            console.log('user Observing')
            setUser(currentUser);
        }));
        return () => unsubscribe()
    }, []) 


    const authInfo={
        createUser,
        signinUser,
        logOut,
        updateUserProfile,
        user,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;