import { useRef, useState } from "react"
import Swal from "sweetalert2"
import { getBackgroundColor } from "../../../lib/getBackgroundColor"
import { timeConverter, timeConverterDetailed } from "../../../lib/timeConverter"
import { AlertType, DefaultAlert } from "../../alerts/Alerts"
import { MatchBeerIcon } from "../../icons/BeerIcons"
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard"
import { Debt } from "./Beerlist"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon, LightningBoltIcon, TerminalIcon } from '@heroicons/react/outline'
import { BeakerIcon } from "@heroicons/react/outline"
import { ref, remove, set, update } from "firebase/database"
import { database } from "../../../firebase/firebaseAuth.client"
import { useUserContext } from "../../../context/userContext"
import { User } from "firebase/auth"
import { DashboardType, useDashboardContext } from "../../../context/dashboardContext"

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const DebtDetails = ({ debt, debtid, guiltyUID, totalDebts, last }: { debt: Debt, debtid: string, guiltyUID: string, totalDebts: number | any, last: boolean }) => {
    const { dashboardType }: any = useDashboardContext();
    const [showActions, setShowActions] = useState(false);
    const cancelButtonRef = useRef(null);
    const { user }: any = useUserContext();

    debt.background = getBackgroundColor(debt);

    const handleRedeem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4ade80',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, redeem it!'
        }).then((result) => {
            if (result.value) {
                try {
                    const updatedDebt: Debt = {
                        ...debt,
                        completedTimestamp: Math.floor(Date.now() / 1000),
                    }

                    let updates: any = {};
                    updates[`debts/${debtid}`] = updatedDebt;
                    updates[`owesme/${user.uid}/${guiltyUID}/debts/${debtid}`] = updatedDebt;
                    updates[`mydebts/${guiltyUID}/${user.uid}/debts/${debtid}`] = updatedDebt;

                    update(ref(database), updates);

                } catch (e) {
                    DefaultAlert(
                        "Something went wrong. Please try again.",
                        AlertType.Error
                    )
                } finally {
                    DefaultAlert(
                        "Debt redeemed!",
                        AlertType.Success
                    )
                    setShowActions(false);
                }
            }
        })
    }

    const handleConfirm = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4ade80',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, confirm it!'
        }).then((result) => {
            if (result.value) {
                try {
                    const updatedDebt: Debt = {
                        ...debt,
                        confirmedTimestamp: Math.floor(Date.now() / 1000),
                    }

                    let updates: any = {};
                    updates[`debts/${debtid}`] = updatedDebt;
                    updates[`owesme/${guiltyUID}/${user.uid}/debts/${debtid}`] = updatedDebt;
                    updates[`mydebts/${user.uid}/${guiltyUID}/debts/${debtid}`] = updatedDebt;

                    console.log(updates);

                    update(ref(database), updates);

                } catch (e) {
                    DefaultAlert(
                        "Something went wrong. Please try again.",
                        AlertType.Error
                    )
                } finally {
                    DefaultAlert(
                        "Debt confirmed!",
                        AlertType.Success
                    )
                    setShowActions(false);
                }
            }
        })
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                try {
                    remove(ref(database, `/debts/${debtid}`))
                    remove(ref(database, `/owesme/${user.uid}/${guiltyUID}/debts/${debtid}`))
                    remove(ref(database, `/mydebts/${guiltyUID}/${user.uid}/debts/${debtid}`))
                } catch (e) {
                    DefaultAlert(
                        "Something went wrong. Please try again.",
                        AlertType.Error
                    )
                } finally {
                    DefaultAlert(
                        "Debt deleted!",
                        AlertType.Success
                    )
                    setShowActions(false);
                }
            }
        })
    }


    return (
        <div
            onClick={() => setShowActions(!showActions)}
            className={classNames(
                debt.confirmedTimestamp ?
                    debt.completedTimestamp ?
                        StatusBackgroundHoverColors.Green
                        :
                        StatusBackgroundHoverColors.Gray
                    :
                    StatusBackgroundHoverColors.Orange,
                "shadow my-2 sm:shadow-none  bg-white text-paragraph cursor-pointer rounded-md px-2 transition-all duration-150 ease-in-out"
            )}
        >
            <div className="relative">
                {
                    !last && totalDebts > 1 ?
                        <span className="absolute top-6 left-6 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        : null
                }
                <div className="relative grid sm:grid-cols-6 grid-cols-7 py-2 group">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div
                                className={classNames(
                                    debt.background,
                                    'h-12 w-12 rounded-full p-1 flex items-center justify-center mb-1 sm:mb-0 group-hover:group-active:rotate-12 sm:group-hover:rotate-12 transition-all duration-300 ease-out'
                                )}
                            >
                                {MatchBeerIcon(debt.type, 60, 60)}
                            </div>
                            <div
                                className={classNames(
                                    debt.background !== StatusBackgroundColors.Transparent ? debt.background : "bg-white",
                                    'h-7 my-auto w-12 p-1 shadow rounded flex items-center justify-center'
                                )}
                            >
                                {debt.size}l
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5 my-auto overflow-hidden sm:col-span-4 px-4 sm:hover:translate-x-1 transition-all duration-150 ease-in-out">
                        <p className="text-sm">
                            <span className="font-medium">
                                &quot;{debt.reason}&quot;
                            </span>
                        </p>
                    </div>

                    <div className="col-span-1 text-paragraph text-sm sm:whitespace-nowrap">
                        <time
                            className={classNames(
                                debt.background,
                                "text-center flex p-2 sm:w-auto shadow-md rounded items-center justify-center"
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


            <Transition.Root show={showActions} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowActions}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="sm:flex ">
                                        <div className={classNames(
                                            debt.completedTimestamp ?
                                                "bg-green-100" :
                                                debt.confirmedTimestamp ?
                                                    "bg-blue-50" :
                                                    "bg-orange-50",
                                            "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                                        )}


                                        >
                                            {
                                                debt.completedTimestamp ?
                                                    <CheckIcon className="h-6 w-6 text-green-400" aria-hidden="true" /> :
                                                    debt.confirmedTimestamp ?
                                                        <LightningBoltIcon className="h-6 w-6" aria-hidden="true" /> :
                                                        <TerminalIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />

                                            }
                                        </div>
                                        <div className="mt-3 text-left sm:mt-0 sm:ml-4 select-none">
                                            <Dialog.Title as="h3" className="text-2xl my-4 leading-6 font-medium text-gray-900 text-center sm:text-left">
                                                Debt Actions
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className="my-6 text-center sm:text-left">
                                                    <div className="text-gray-500">
                                                        {
                                                            debt.completedTimestamp ?
                                                                <span className="bg-green-100 sm:bg-transparent text-green-700 p-2 sm:p-0 rounded-lg font-bold shadow-sm cursor-default">
                                                                    Redeemed
                                                                </span> :
                                                                debt.confirmedTimestamp ?
                                                                    <span className="bg-blue-100 sm:bg-transparent text-blue-700 p-2 sm:p-0 rounded-lg font-bold shadow-sm cursor-default">
                                                                        Confirmed
                                                                    </span> :
                                                                    <span className="bg-orange-100 sm:bg-transparent text-orange-700 p-2 sm:p-0 rounded-lg font-bold shadow-sm cursor-default">
                                                                        Unconfirmed
                                                                    </span>
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    debt.completedTimestamp ?
                                                        <div className="grid grid-cols-2 text-sm">
                                                            <div className="font-medium text-gray-700">
                                                                Redeemed:
                                                            </div>
                                                            <div className="text-gray-500 font-normal">
                                                                {timeConverterDetailed(debt.completedTimestamp)}
                                                            </div>
                                                        </div> :
                                                        null
                                                }
                                                {
                                                    debt.confirmedTimestamp ?
                                                        <div className="grid grid-cols-2 text-sm">
                                                            <div className="font-medium text-gray-700">
                                                                Confirmed:
                                                            </div>
                                                            <div className="text-gray-500 font-normal">
                                                                {timeConverterDetailed(debt.confirmedTimestamp)}
                                                            </div>
                                                        </div> :
                                                        null
                                                }
                                                <div className="grid grid-cols-1">
                                                    <div className="grid grid-cols-2 text-sm">
                                                        <div className="font-medium text-gray-700">
                                                            Created:
                                                        </div>
                                                        <div className="text-gray-500 font-normal">
                                                            {timeConverterDetailed(debt.createdTimestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-3 gap-3 mt-3">

                                        {
                                            !debt.completedTimestamp && debt.confirmedTimestamp && dashboardType === DashboardType.OwesMe ?
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-xl font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                                    onClick={handleRedeem}
                                                >
                                                    Redeem
                                                </button>
                                                :
                                                <div>

                                                </div>
                                        }

                                        {
                                            dashboardType === DashboardType.OwesMe ?
                                                (
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-xl font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </button>
                                                ) :
                                                debt.confirmedTimestamp ?
                                                    <div></div> :
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-400 text-xl font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                                        onClick={handleConfirm}
                                                    >
                                                        Confirm
                                                    </button>
                                        }



                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-xl font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                            onClick={() => setShowActions(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}