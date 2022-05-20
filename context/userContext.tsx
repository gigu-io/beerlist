import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase/firebaseAuth.client";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../components/alerts/Alerts";
import { get, ref, set } from "firebase/database";

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

                // check if user is in database
                const userRef = ref(database, 'users/' + user.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.size === 0) {
                        // user is not in database
                        set(userRef, {
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            notificationsEnabled: true
                        });
                    }
                });
            } else {
                router.push('/');
                setUser(null);
            }
            setLoading(false);
        })
        // eslint-disable-next-line
    }, []);

    const signInWithGoogle = () => {
        setLoading(true);
        setError(null);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
                setLoading(false);
                DefaultAlert("Successfully signed in with Google", AlertType.Success);
                router.push('/owesme');
            })
            .catch((err: any) => {
                setError(err);
                setLoading(false);
                DefaultAlertMessage("Error", err.message, AlertType.Error);
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
                DefaultAlert("Successfully signed in with GitHub", AlertType.Success);
                router.push('/owesme');
            })
            .catch((err: any) => {
                setError(err);
                setLoading(false);
                DefaultAlertMessage("Error", err.message, AlertType.Error);
            })
            .finally(() => {
                setLoading(false);
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