import { useState } from "react"
import { DashboardType, useDashboardContext } from "../../context/dashboardContext";
import Beerlist from "./list/Beerlist";

export default function DeptsOverview() {
    const [totalReceiveBeerCount, setTotalReceiveBeerCount] = useState(0);

    const { dashboardType }: any = useDashboardContext();

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="overflow-hidden rounded-lg divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-center text-3xl leading-9 font-bold text-white">
                            {
                                dashboardType === DashboardType.OwesMe ?
                                    "Owes Me" :
                                    "My Debts"
                            }
                        </h1>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <Beerlist />
                    </div>
                </div>
            </div>
        </div>
    )
}