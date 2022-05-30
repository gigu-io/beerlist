import { Fragment, useState } from "react";
import { MatchBeerIcon } from "../../icons/BeerIcons";
import { ChevronRightIcon } from '@heroicons/react/solid';
import ExportedImage from "next-image-export-optimizer";
import { StatusBackgroundColors } from "../Dashboard";
import { DebtDetails } from "./DebtDetails";
import { Debt, UserDebtList, } from "./Beerlist";
import { Disclosure, Transition } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export interface SmallUser {
    email: string;
    photoURL: string;
    displayName: string | null;
    notificationsEnabled?: boolean;
}

export interface BeerGuilty {
    id: number,
    user: SmallUser,
    debts: Array<Debt>
}

export default function BeerlistDetails({ userDebtList, guiltyUID }: { userDebtList: UserDebtList, guiltyUID: string }) {
    const [showDetails, setShowDetails] = useState(false);
    let debts: Map<string, Debt> = new Map<string, Debt>();
    if (userDebtList.debts) {
        Object.keys(userDebtList.debts).forEach((key: string) => {
            // @ts-ignore
            debts.set(key, userDebtList.debts[key]);
            // @ts-ignore
            if (debts.get(key) && debts.get(key).users) {
                // @ts-ignore
                Object.keys(debts.get(key).users).forEach((key2: string) => {
                    // @ts-ignore
                    debts.get(key).users[key2].uid = key2;
                });
            }
        });
    }

    if (debts.size > 0) {
        //sort by if confirmedTimestamp exists and by createdTimestamp and move completedTimestamp to the end
        // @ts-ignore
        debts = new Map([...debts.entries()].sort((a, b) => {
            if (a[1].confirmedTimestamp && b[1].confirmedTimestamp) {
                return a[1].confirmedTimestamp - b[1].confirmedTimestamp;
            }
            if (a[1].confirmedTimestamp) {
                return -1;
            }
            if (b[1].confirmedTimestamp) {
                return 1;
            }
            return a[1].createdTimestamp - b[1].createdTimestamp;
        }));

        // move "completed" debts to the end of the list
        const completedDebts = new Map<string, Debt>();
        const activeDebts = new Map<string, Debt>();
        debts.forEach((debt: Debt, key: string) => {
            if (debt.completedTimestamp) {
                completedDebts.set(key, debt);
            }
            else {
                activeDebts.set(key, debt);
            }
        });

        // @ts-ignore
        debts = new Map([...activeDebts.entries(), ...completedDebts.entries()]);


    } else {
        return null;
    }

    // REFACTOR the whole thing to use a map

    let incompleteConfirmedDebts: Map<string, Debt> = new Map<string, Debt>();
    let incompleteUnconfirmedDebts: Map<string, Debt> = new Map<string, Debt>();
    let completeConfirmedDebts: Map<string, Debt> = new Map<string, Debt>();

    if (debts) {
        Array.from(debts).map(([key, debt]: [string, Debt]) => {
            if (!debt.confirmedTimestamp) {
                incompleteUnconfirmedDebts.set(key, debt);
            } else if (!debt.completedTimestamp) {
                incompleteConfirmedDebts.set(key, debt);
            } else {
                completeConfirmedDebts.set(key, debt);
            }
        });
    }

    return (
        <Disclosure>
            <a
                onClick={() => setShowDetails(!showDetails)}
                className={
                    classNames(
                        "cursor-pointer block group bg-white sm:hover:bg-gray-50 hover:active:bg-gray-50 transition-all duration-150 ease-in-out"
                    )
                }

            >
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="mt-1">
                            <ExportedImage
                                // unoptimized={true}
                                width={56}
                                height={56}
                                className="rounded-full"
                                src={userDebtList.userinfo.photoURL}
                                alt=""
                            />
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                            <p className="text-xl font-medium text-stroke truncate">{userDebtList.userinfo.displayName}</p>
                            <p className=" text-sm font-light text-gray-500 truncate">
                                {
                                    userDebtList.userinfo.email.replace(/^(.{2}).*(@.*)$/, '$1***$2')
                                }
                            </p>
                            <div className="mt-2 grid sm:grid-cols-6 grid-cols-3 gap-2 items-center text-md text-paragraph">
                                {
                                    incompleteConfirmedDebts.size > 0 ?
                                        <span key={
                                            incompleteConfirmedDebts.values().next().value.type
                                        } className="inline-flex p-1 shadow-md rounded-md ">
                                            <div className="flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{incompleteConfirmedDebts.size}</span>x
                                                </span>
                                                <span className="sm:group-hover:rotate-12 group-hover:group-active:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(incompleteConfirmedDebts.values().next().value.type, 35, 35)}
                                                </span>
                                            </div>
                                        </span>
                                        : null
                                }
                                {
                                    incompleteUnconfirmedDebts.size > 0 ?
                                        <span className={classNames(
                                            StatusBackgroundColors.Orange,
                                            "group inline-flex p-2.5 rounded-md shadow-md text-center"
                                        )}>
                                            <div className="flex m-auto">
                                                <span className="text-paragraph font-bold">
                                                    {incompleteUnconfirmedDebts.size}
                                                    <span className="font-normal">x</span>
                                                </span>
                                                &nbsp;
                                                <span className="text-paragraph font-extrabold">?</span>
                                            </div>
                                        </span>
                                        : null
                                }
                                {
                                    completeConfirmedDebts.size > 0 ?
                                        <span className={classNames(
                                            StatusBackgroundColors.Green,
                                            "group inline-flex p-2.5 rounded-md shadow-md text-center"
                                        )}>
                                            <div className="flex m-auto">
                                                <span className="text-paragraph font-bold">
                                                    {completeConfirmedDebts.size}
                                                    <span className="font-normal">x</span>
                                                </span>
                                                &nbsp;
                                                <span className="text-paragraph font-extrabold">✓</span>
                                            </div>
                                        </span>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRightIcon className={classNames(
                            showDetails ? 'rotate-90 text-tertiary' : 'rotate-0 text-paragraph',
                            "h-6 w-6 transition-all duration-150 ease-in-out"
                        )}
                        />
                    </div>
                </div>
            </a>

            <div className={classNames(
                showDetails ? 'max-h-full opacity-100' : 'opacity-0 max-h-0',
                " transition-opacity duration-300 ease-in-out overflow-hidden"
            )}>
                <ul role="list">
                    {
                        Array.from(debts).map(([key, debt]: [string, Debt], i: number) => (

                            <li key={key}>
                                <DebtDetails debt={debt} debtid={key} guiltyUID={guiltyUID} totalDebts={debts.size} key={key} last={
                                    i === debts.size - 1
                                } />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Disclosure>
    )
}