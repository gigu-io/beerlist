import Swal from "sweetalert2"
import { getBackgroundColor } from "../../../lib/getBackgroundColor"
import { timeConverter } from "../../../lib/timeConverter"
import { AlertType, DefaultAlert } from "../../alerts/Alerts"
import { MatchBeerIcon } from "../../icons/BeerIcons"
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard"
import { Debt } from "./Beerlist"

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const DebtDetails = ({ debt, debtid, totalDebts, last }: { debt: Debt, debtid: string, totalDebts: number | any, last: boolean }) => {

    debt.background = getBackgroundColor(debt);

    const handleClick = () => {
        if (debt.confirmedTimestamp && !debt.completedTimestamp) {
            Swal.fire({
                title: "redeem debt?",
                text: "Are you sure you want to redeem this debt?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4ade80",
                cancelButtonColor: "#f87171",
                confirmButtonText: "Yes, redeem it!"
            }).then((result) => {
                if (result.value) {
                    DefaultAlert("Successfully redeemed debt", AlertType.Success)
                }
            })
        }
        else if (!debt.confirmedTimestamp && !debt.completedTimestamp) {
            Swal.fire({
                title: "confirm debt?",
                text: "Are you sure you want to confirm this debt?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4ade80",
                cancelButtonColor: "#f87171",
                confirmButtonText: "Yes, confirm it!"
            }).then((result) => {
                if (result.value) {
                    DefaultAlert("Successfully confirmed debt", AlertType.Success)
                }
            })
        }

    }

    return (
        <div
            onClick={handleClick}
            className={classNames(
                debt.confirmedTimestamp ?
                    debt.completedTimestamp ?
                        StatusBackgroundHoverColors.Green
                        :
                        StatusBackgroundHoverColors.Gray
                    :
                    StatusBackgroundHoverColors.Orange,
                "shadow my-2 sm:my-0 sm:shadow-none hover:bg-opacity-50 text-paragraph cursor-pointer rounded-md px-2 transition-all duration-150 ease-in-out"
            )}
        >
            <div className="relative">
                {
                    !last && totalDebts > 1 ?
                        <span className="absolute top-6 left-5 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                        : null
                }
                <div className="relative grid sm:grid-cols-6 grid-cols-8 space-x-3 py-4 group">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div
                                className={classNames(
                                    debt.background,
                                    'h-10 w-10 rounded-full p-1 flex items-center justify-center mb-1 sm:mb-0 group-hover:rotate-12 transition-all duration-300 ease-out'
                                )}
                            >
                                {MatchBeerIcon(debt.type, 30, 30)}
                            </div>
                            <div
                                className={classNames(
                                    debt.background !== StatusBackgroundColors.Transparent ? debt.background : "bg-white",
                                    'h-7 my-auto w-10 p-1 shadow rounded flex items-center justify-center'
                                )}
                            >
                                {debt.size}l
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-4 hover:translate-x-1 transition-all duration-150 ease-in-out">
                        <p className="text-sm">
                            <a className="font-medium">
                                &quot;{debt.reason}&quot;
                            </a>
                        </p>
                    </div>

                    <div className="text-sm text-center whitespace-nowrap col-span-1">
                        <time
                            className={classNames(
                                debt.background,
                                "text-sm  p-1 rounded"
                            )}
                            dateTime={
                                debt.completedTimestamp ?
                                    debt.confirmedTimestamp ?
                                        timeConverter(debt.completedTimestamp)
                                        :
                                        // @ts-ignore
                                        timeConverter(debt.confirmedTimestamp)
                                    :
                                    timeConverter(debt.createdTimestamp)
                            }>
                            {
                                debt.completedTimestamp ?
                                debt.confirmedTimestamp ?
                                        timeConverter(debt.completedTimestamp)
                                        :
                                        // @ts-ignore
                                        timeConverter(debt.confirmedTimestamp)
                                    :
                                    timeConverter(debt.createdTimestamp)
                            }
                        </time>
                    </div>

                </div>
            </div>
        </div>
    )
}