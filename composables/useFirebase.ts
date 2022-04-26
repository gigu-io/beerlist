import {
    getAuth,
    onAuthStateChanged,
    GithubAuthProvider,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

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
            console.log(error);
        });
    console.log(result);
    return result;
}

export const signInUserWithGithub = async () => {
    const provider = new GithubAuthProvider();

    const auth = getAuth();
    const result = await signInWithPopup(auth, provider)
        .catch((error) => {
            console.log(error);
        });
    return result;
}

export const signInUserWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    const result = await signInWithPopup(auth, provider)
        .catch((error) => {
            console.log(error);
        });
    return result;
}