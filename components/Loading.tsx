import { CircularProgress } from "@mui/material";
import Image from "next/image";


export default function Loading() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* <CircularProgress color="inherit" />
            <h2>loading some beer...</h2> */}
            <div className="relative h-20 w-20 animate-bounce">
                <Image
                    src="/images/logo/beerlist_logo.png"
                    alt="beerlist logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <span className="text-xl text-paragrapsh animate-pulse">loading some beer...</span>
        </div>
    );


}