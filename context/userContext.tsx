import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseAuth.client";
import { User } from "firebase/auth";
import { useRouter } from "next/router";

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

type Props = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        })
    }, []);

    const signInWithGoogle = () => {
        setLoading(true);
        setError(null);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
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
            .then(() => {
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