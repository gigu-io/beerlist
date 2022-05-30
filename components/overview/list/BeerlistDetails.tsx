import { Fragment, useState } from "react";
import { Beer, MatchBeerIcon } from "../../icons/BeerIcons";
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
    let lagerCount: number = 0;
    let darkCount: number = 0;
    let ipaCount: number = 0;
    let stoutCount: number = 0;

    if (debts) {
        Array.from(debts).map(([key, debt]: [string, Debt]) => {
            if (!debt.confirmedTimestamp) {
                incompleteUnconfirmedDebts.set(key, debt);
            } else if (!debt.completedTimestamp) {
                incompleteConfirmedDebts.set(key, debt);
                if (debt.type === Beer.Lager) {
                    lagerCount++;
                }
                if (debt.type === Beer.Dark) {
                    darkCount++;
                }
                if (debt.type === Beer.IPA) {
                    ipaCount++;
                }
                if (debt.type === Beer.Stout) {
                    stoutCount++;
                }
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
                            <p className="text-xl font-medium text-gray-700 truncate">{userDebtList.userinfo.displayName}</p>
                            <p className=" text-sm font-light text-gray-500 truncate">
                                {
                                    userDebtList.userinfo.email.replace(/^(.{2}).*(@.*)$/, '$1***$2')
                                }
                            </p>
                            <div className="mt-2 grid sm:grid-cols-6 grid-cols-3 gap-2 items-center text-md text-gray-700">
                                {/* Every Type of Beer */}
                                {
                                    incompleteConfirmedDebts.size > 0 && lagerCount > 0 ?
                                        <div className={classNames(
                                            "flex w-full py-2 rounded-md shadow-md text-center bg-white"
                                        )}>
                                            <div className="inline-flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{lagerCount}</span>x
                                                </span>
                                                <span className="sm:group-hover:rotate-12 group-hover:group-active:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(Beer.Lager, 35, 35)}
                                                </span>
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    incompleteConfirmedDebts.size > 0 && darkCount > 0 ?
                                        <div className={classNames(
                                            "flex w-full py-2 rounded-md shadow-md text-center bg-white"
                                        )}>
                                            <div className="inline-flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{darkCount}</span>x
                                                </span>
                                                <span className="sm:group-hover:rotate-12 group-hover:group-active:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(Beer.Dark, 35, 35)}
                                                </span>
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    incompleteConfirmedDebts.size > 0 && ipaCount > 0 ?
                                        <div className={classNames(
                                            "flex w-full py-2 rounded-md shadow-md text-center bg-white"
                                        )}>
                                            <div className="inline-flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{ipaCount}</span>x
                                                </span>
                                                <span className="sm:group-hover:rotate-12 group-hover:group-active:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(Beer.IPA, 35, 35)}
                                                </span>
                                            </div>
                                        </div>
                                        : null
                                }
                                {
                                    incompleteConfirmedDebts.size > 0 && stoutCount > 0 ?
                                        <div className={classNames(
                                            "flex w-full py-2 rounded-md shadow-md text-center bg-white"
                                        )}>
                                            <div className="inline-flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{stoutCount}</span>x
                                                </span>
                                                <span className="sm:group-hover:rotate-12 group-hover:group-active:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(Beer.Stout, 35, 35)}
                                                </span>
                                            </div>
                                        </div>
                                        : null
                                }

                                {/* Unconfirmed */}
                                {
                                    incompleteUnconfirmedDebts.size > 0 ?
                                        <div className={classNames(
                                            StatusBackgroundColors.Orange,
                                            "inline-flex w-full py-3 rounded-md shadow-md text-center"
                                        )}>
                                            <div className="flex m-auto">
                                                <span className="text-gray-700 font-bold">
                                                    {incompleteUnconfirmedDebts.size}
                                                    <span className="font-normal">x</span>
                                                </span>
                                                &nbsp;
                                                <span className="text-gray-700 font-extrabold">?</span>
                                            </div>
                                        </div>
                                        : null
                                }
                                {/* Completed */}
                                {
                                    completeConfirmedDebts.size > 0 ?
                                        <div className={classNames(
                                            StatusBackgroundColors.Green,
                                            "inline-flex w-full py-3 rounded-md shadow-md text-center"
                                        )}>
                                            <div className="flex m-auto">
                                                <span className="text-gray-700 font-bold">
                                                    {completeConfirmedDebts.size}
                                                    <span className="font-normal">x</span>
                                                </span>
                                                &nbsp;
                                                <span className="text-gray-700 font-extrabold">✓</span>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRightIcon className={classNames(
                            showDetails ? 'rotate-90 text-tertiary' : 'rotate-0 text-gray-700',
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