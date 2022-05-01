import { useState } from "react"
import CardTimeline from "./CardTimeline";

export default function Beercard() {
    const [totalReceiveBeerCount, setTotalReceiveBeerCount] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className=" bg-highlight overflow-hidden shadow rounded-lg divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-center text-3xl leading-9 font-normal text-stroke">
                            You will receive <span className="font-bold font-under">{totalReceiveBeerCount}</span> beer!
                        </h1>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        {/* <CardTimeline /> */}
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        {/* Content goes here */}
                        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                    </div>
                </div>
            </div>
        </div>
    )
}