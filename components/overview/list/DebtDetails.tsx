import { useRef, useState } from "react"
import Swal from "sweetalert2"
import { getBackgroundColor } from "../../../lib/getBackgroundColor"
import { timeConverter } from "../../../lib/timeConverter"
import { AlertType, DefaultAlert } from "../../alerts/Alerts"
import { MatchBeerIcon } from "../../icons/BeerIcons"
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard"
import { Debt } from "./Beerlist"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { BeakerIcon } from "@heroicons/react/outline"
import { ref, remove, set, update } from "firebase/database"
import { database } from "../../../firebase/firebaseAuth.client"
import { useUserContext } from "../../../context/userContext"
import { User } from "firebase/auth"

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const DebtDetails = ({ debt, debtid, guiltyUID, totalDebts, last }: { debt: Debt, debtid: string, guiltyUID: string, totalDebts: number | any, last: boolean }) => {
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

                    console.log(updates);

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
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-50 sm:mx-0 sm:h-10 sm:w-10">
                                            <BeakerIcon className="h-6 w-6 text-tertiary" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Manage debt
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Select the action you want to perform.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                                        {
                                            !debt.completedTimestamp && debt.confirmedTimestamp ?
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                                    onClick={handleRedeem}
                                                >
                                                    Redeem
                                                </button>
                                                : 
                                                <div>

                                                </div>
                                        }

                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-150 ease-in-out"
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