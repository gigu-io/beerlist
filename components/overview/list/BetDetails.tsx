import Swal from "sweetalert2"
import { AlertType, DefaultAlert } from "../../alerts/Alerts"
import { Beer, MatchBeerIcon } from "../../icons/BeerIcons"
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard"
import { Bet } from "./BeerlistDetails"

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const BetDetails = ({bet, total}: {bet: Bet, total: number}) => {

    const handleClick = () => {
        if (bet.confirmed && !bet.completeDate) {
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
        else if (!bet.confirmed && !bet.completeDate) {
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
            key={bet.id}
            className={classNames(
                bet.confirmed ?
                    bet.completeDate ?
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
                    bet.id !== total && total > 1 ? 
                    <span className="absolute top-6 left-5 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                    : null
                }
                <div className="relative grid sm:grid-cols-7 grid-cols-7 space-x-3 py-4 group">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div
                                className={classNames(
                                    bet.background,
                                    'h-10 w-10 rounded-full p-1 flex items-center justify-center mb-1 sm:mb-0 group-hover:rotate-12 transition-all duration-300 ease-out'
                                )}
                            >
                                {/* <bet.icon width={30} height={30} /> */}
                                {MatchBeerIcon(bet.type, 30, 30)}
                            </div>
                            <div
                                className={classNames(
                                    bet.background !== StatusBackgroundColors.Transparent ? bet.background : "bg-white",
                                    'h-7 my-auto w-10 p-1 shadow rounded flex items-center justify-center'
                                )}
                            >
                                {bet.size}l
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 sm:col-span-5 hover:translate-x-1 transition-all duration-150 ease-in-out">
                        <p className="text-sm">
                            <a className="font-medium">
                                &quot;{bet.reason}&quot;
                            </a>
                        </p>
                    </div>

                    <div className="text-sm text-center whitespace-nowrap col-span-1">
                        <time
                            className={classNames(
                                bet.background,
                                "text-sm  p-1 rounded"
                            )}
                            dateTime={bet.completeDatetime ? bet.completeDatetime : bet.date}>
                            {bet.completeDate ? bet.completeDate : bet.date}
                        </time>
                    </div>

                </div>
            </div>
        </div>
    )
}