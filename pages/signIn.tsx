import { useRouter } from "next/router";
import Auth from "../components/Auth";
import { useUserContext } from "../context/userContext";

export default function signIn() {

    const { user }: any = useUserContext();
    const router = useRouter();

    if (user) {
        router.push("/");
    }

    return <Auth />
}