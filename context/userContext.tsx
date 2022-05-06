import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseAuth.client";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";

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
                DefaultAlertMessage("Error", err.message, AlertType.Error);
            })
            .finally(() => {
                setLoading(false);
                DefaultAlert("Successfully signed in with Google", AlertType.Success);
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
                DefaultAlertMessage("Error", err.message, AlertType.Error);
            })
            .finally(() => {
                setLoading(false);
                DefaultAlert("Successfully signed in with GitHub", AlertType.Success);
            });
    }

    const logoutUser = () => {
        signOut(auth);
        setUser(null);
        setError(null);
        DefaultAlert("Logged out", AlertType.Success);
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