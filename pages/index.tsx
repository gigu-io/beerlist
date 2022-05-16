import { useRouter } from "next/router";
import Auth from "../components/Auth";
import { useUserContext } from "../context/userContext";

const Home = () => {
  const { user }: any = useUserContext();
  const router = useRouter();

  if (user) {
      router.push("/debts");
  }

  return <Auth />
}

export default Home
