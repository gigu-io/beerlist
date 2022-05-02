import { CircularProgress } from "@mui/material";
import Image from "next/image";


export default function Loading() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <CircularProgress color="inherit" />
            <span className="text-xl text-paragrapsh animate-pulse">loading some beer...</span>
        </div>
    );


}