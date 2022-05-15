import { useRouter } from "next/router";
import Auth from "../components/Auth";
import { useUserContext } from "../context/userContext";

export default function signIn() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user }: any = useUserContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    if (user) {
        router.push("/");
    }

    return <Auth />
}