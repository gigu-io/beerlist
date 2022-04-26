import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GithubAuthProvider,
    signInWithPopup
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

    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (user) {

        } else {
            router.push("/");
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

export const signInUserWithGithub = async () => {
    console.log('signInUserWithGithub');
    const provider = new GithubAuthProvider();

    const auth = getAuth();
    await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            return result.user;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            console.log(error);
        });
}