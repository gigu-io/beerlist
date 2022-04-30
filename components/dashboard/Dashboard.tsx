import { User } from "firebase/auth";
import Navbar from "./Navbar"

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                            {/* Content goes here */}
                            {/* We use less vertical padding on card headers on desktop than on body sections */}
                        </div>
                        <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
                        <div className="px-4 py-4 sm:px-6">
                            {/* Content goes here */}
                            {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}