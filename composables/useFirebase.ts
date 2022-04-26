import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";


export const createUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    return credentials;
}

export const signInUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    return credentials;
}

export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser: any = useFirebaseUser();
    firebaseUser.value = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // console.log('Auth changed:', user);
        } else {
            // console.log('Auth changed:', user);
        }
        firebaseUser.value = user;
    });
}

export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut()
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    console.log(result);
    return result;
}