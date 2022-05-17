import { useRouter } from "next/router";
import React from "react";
import { useUserContext } from "../context/userContext";
import BuyMeACoffee from "./donate/BuyMeACoffee";
import Navbar from "./Navbar";

export default function Layout(props: any) {
    const { user, loading, error }: any = useUserContext();

    const router = useRouter();

    return (
        <div className="bg-[url('/images/background/waves.svg')] bg-no-repeat bg-center bg-cover h-screen">
            {
                router.pathname != "/" ?
                    <Navbar /> :
                    null
            }
            <main className="">
                {React.cloneElement(props.children)}
            </main>
            <BuyMeACoffee />
        </div>
    )
}