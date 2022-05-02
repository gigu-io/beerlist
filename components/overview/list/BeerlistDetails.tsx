import { useState } from "react";
import { AnnotationIcon, CheckIcon, ChevronDownIcon, DotsCircleHorizontalIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import { BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout } from "../../icons/BeerIcons";
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { User } from 'firebase/auth'
import Image from "next/image";
import { BadgeCheckIcon, ChevronDoubleRightIcon, LinkIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export enum Beer {
    Dark = 'Dark',
    IPA = 'IPA',
    Lager = 'Lager',
    Stout = 'Stout'
}

export interface Bet {
    id: number
    type: Beer
    icon: any
    reason: string
    size: string
    date: string
    datetime: string
    background: string | "bg-transparent"
    confirmed: boolean
    completeDate: string | null
    completeDatetime: string | null
}

export default function BeerlistDetails({ beerguilty }: any) {
    const [showDetails, setShowDetails] = useState(false);

    const confirmedBets = beerguilty.bets.filter((bet: Bet) => bet.confirmed)
    const incompleteBets = beerguilty.bets.filter((bet: Bet) => !bet.completeDate)
    const unconfirmedBets = beerguilty.bets.filter((bet: Bet) => !bet.confirmed)
    const uncofirmedIncompleteBets = unconfirmedBets.filter((bet: Bet) => !bet.completeDate)
    const confirmedIncompleteBets = confirmedBets.filter((bet: Bet) => !bet.completeDate)
    const confirmedCompleteBets = confirmedBets.filter((bet: Bet) => bet.completeDate)

    unconfirmedBets.forEach((bet: Bet) => {
        bet.background = StatusBackgroundColors.Orange
    })

    const completeBets = beerguilty.bets.filter((bet: Bet) => bet.completeDate)
    completeBets.forEach((bet: Bet) => {
        bet.background = StatusBackgroundColors.Green
    })

    interface BetListCount {
        type: Beer
        count: number
    }

    const incompleteConfirmedBetsCount = confirmedIncompleteBets.reduce((acc: BetListCount[], bet: Bet) => {
        const existing = acc.find((count: BetListCount) => count.type === bet.type)
        if (existing) {
            existing.count++
        } else {
            acc.push({ type: bet.type, count: 1 })
        }
        return acc
    }, [])

    return (
        <div>
            <a
                onClick={() => setShowDetails(!showDetails)}
                className="cursor-pointer block hover:bg-gray-50 transition-all duration-150 ease-in-out"
            >
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="mt-1">
                            <Image width={56} height={56} className="rounded-full" src={beerguilty.user.imageUrl} alt="" />
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                            <p className="text-sm font-medium text-stroke truncate">{beerguilty.user.name}</p>
                            <p className="mt-2 grid sm:grid-cols-6 grid-cols-4 gap-2 items-center text-sm text-paragraph">
                                {/* Total Overview of all incomplete Bets */}
                                {
                                    incompleteConfirmedBetsCount.map((bet: BetListCount) => (
                                        <span key={bet.type} className="flex shadow p-1 rounded-md">
                                            <span className="m-auto inline-flex"><span className="font-bold">{bet.count}</span>x
                                                <span>
                                                    {
                                                        bet.type === Beer.Dark ? <BeerIconDark width={20} height={20} /> :
                                                            bet.type === Beer.IPA ? <BeerIconIPA width={20} height={20} /> :
                                                                bet.type === Beer.Lager ? <BeerIconLager width={20} height={20} /> :
                                                                    bet.type === Beer.Stout ? <BeerIconStout width={20} height={20} /> :
                                                                        null
                                                    }
                                                </span>
                                            </span>
                                        </span>
                                    ))
                                }
                                {
                                    uncofirmedIncompleteBets.length > 0 &&
                                    <span className={classNames(
                                        StatusBackgroundColors.Orange,
                                        "p-1 rounded-md shadow text-center"
                                    )}>
                                        <span className="text-paragraph font-bold">{uncofirmedIncompleteBets.length}</span>x
                                        {' '}
                                        <span className="text-paragraph font-extrabold">?</span>
                                    </span>
                                }
                                {
                                    confirmedCompleteBets.length > 0 &&
                                    <span className={classNames(
                                        StatusBackgroundColors.Green,
                                        "p-1 rounded-md shadow text-center"
                                    )}>
                                        <span className="text-paragraph font-bold">{confirmedCompleteBets.length}</span>x
                                        {' '}
                                        <span className="text-paragraph font-extrabold">✓</span>
                                    </span>
                                }

                            </p>
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
                showDetails ? 'max-h-screen h-auto' : 'max-h-0',
                "bg-white transition-all duration-150 ease-in-out overflow-hidden"
            )}>
                <ul role="list" className="p-4">
                    {beerguilty.bets.map((bet: any, betIdx: any) => (
                        <li
                            key={bet.id}
                            className={classNames(
                                bet.confirmed ?
                                    bet.completeDate ?
                                        StatusBackgroundHoverColors.Green
                                        :
                                        'hover:bg-gray-50'
                                    :
                                    StatusBackgroundHoverColors.Orange,
                                "shadow my-2 sm:my-0 sm:shadow-none hover:bg-opacity-50 text-paragraph cursor-pointer rounded-md px-2 transition-all duration-150 ease-in-out"
                            )}
                        >
                            <div className="relative">

                                {betIdx !== beerguilty.bets.length - 1 ? (
                                    <span className="absolute top-6 left-5 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true" />
                                ) : null}
                                <div className="relative grid sm:grid-cols-7 grid-cols-7 space-x-3 py-4 group">
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-1 sm:grid-cols-2">
                                            <div
                                                className={classNames(
                                                    bet.background,
                                                    'h-10 w-10 rounded-full p-1 flex items-center justify-center mb-1 sm:mb-0 group-hover:rotate-12 transition-all duration-300 ease-out'
                                                )}
                                            >
                                                <bet.icon width={30} height={30} />
                                            </div>
                                            <div
                                                className={classNames(
                                                    bet.background,
                                                    'h-7 my-auto w-10 p-1 shadow rounded flex items-center justify-center'
                                                )}
                                            >
                                                {bet.size}l
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-4 sm:col-span-5 hover:translate-x-1 transition-all duration-150 ease-in-out">
                                        <p className="text-sm">
                                            <a href={bet.href} className="font-medium">
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
                                <div className="grid grid-cols-2">



                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}