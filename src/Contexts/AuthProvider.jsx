import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/Firebase/firebase.config';
import useAxios from '@/Hooks/useAxios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axios = useAxios();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    const logOut = async () => {
        setLoading(true);

        try {
            await axios.post('/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }

        return signOut(auth);
    };


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)

            if (currentUser?.email) {
                axios.post('/jwt', { email: currentUser.email }, { withCredentials: true })
                    .then(res => {
                        console.log('token after jwt', res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });

        return () => {
            unSubscribe();
        }
    }, [axios])

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;