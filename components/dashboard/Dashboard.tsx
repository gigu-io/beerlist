import { User } from "firebase/auth";
import Beercard from "./Beercard";
import Navbar from "./Navbar"

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <Beercard />
        </div>
    );
}