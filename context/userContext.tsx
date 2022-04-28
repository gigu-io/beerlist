import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebaseAuth.client";

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = (children: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useState(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res: any) => {

            res ? setUser(res) : setUser(null);
            setError(null);
            setLoading(false);
        });
        return unsubscribe;
    });

    const signInWithGoogle = () => {
        setLoading(true);
        setError(null);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((res: any) => {
                setUser(res);
                setLoading(false);
            })
            .catch((err: any) => {
                setError(err);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const signInWithGithub = () => {
        setLoading(true);
        setError(null);
        signInWithPopup(auth, new GithubAuthProvider())
            .then((res: any) => {
                setUser(res);
                setLoading(false);
            })
            .catch((err: any) => {
                setError(err);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const logoutUser = () => {
        signOut(auth);
        setUser(null);
        setError(null);
    }

    const contextValue = {
        user,
        loading,
        error,
        signInWithGoogle,
        signInWithGithub,
        logoutUser
    };
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}