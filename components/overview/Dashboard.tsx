import { User } from "firebase/auth";
import DeptsOverview from "./DepsOverview";
import Navbar from "../Navbar"

export enum StatusBackgroundColors {
    Green = "bg-green-200",
    Red = "bg-red-200",
    Orange = "bg-orange-200",
}

export enum StatusBackgroundHoverColors {
    Green = "hover:bg-green-100",
    Red = "hover:bg-red-100",
    Orange = "hover:bg-orange-100",
}

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <DeptsOverview />
        </div>
    );
}