import { useState } from "react";
import { AnnotationIcon, CheckIcon, ChevronDownIcon, DotsCircleHorizontalIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import { Beer, BeerIcon, BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout, MatchBeerIcon } from "../../icons/BeerIcons";
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { User, UserInfo } from 'firebase/auth'
import ExportedImage from "next-image-export-optimizer";
import { BadgeCheckIcon, ChevronDoubleRightIcon, LinkIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { StatusBackgroundColors, StatusBackgroundHoverColors } from "../Dashboard";
import { BetDetails } from "./BetDetails";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export interface SmallUser {
    uid: string;
    email: string;
    photoURL: string;
    displayName: string;
}

export interface BeerGuilty {
    id: number,
    user: SmallUser,
    bets: Array<Bet>
}

export interface Bet {
    id: number
    type: Beer
    reason: string
    size: string
    date: string
    datetime: string
    background: string | "bg-transparent"
    confirmed: boolean
    completeDate: string | null
    completeDatetime: string | null
}

export default function BeerlistDetails({ beerguilty }: {beerguilty: BeerGuilty}) {
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

    confirmedIncompleteBets.forEach((bet: Bet) => {
        bet.background = StatusBackgroundColors.Transparent
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
                            <ExportedImage
                                // unoptimized={true}
                                width={56}
                                height={56}
                                className="rounded-full"
                                src={beerguilty.user.photoURL}
                                alt=""
                            />
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                            <p className="text-sm font-medium text-stroke truncate">{beerguilty.user.displayName}</p>
                            <div className="mt-2 grid sm:grid-cols-6 grid-cols-3 gap-2 items-center text-md text-paragraph">
                                {/* Total Overview of all incomplete Bets */}
                                {
                                    incompleteConfirmedBetsCount.map((bet: BetListCount) => (
                                        <span key={bet.type} className="group inline-flex p-1 shadow-md rounded-md ">
                                            <div className="flex m-auto">
                                                <span className="my-auto">
                                                    <span className="font-bold">{bet.count}</span>x
                                                </span>
                                                <span className="group-hover:rotate-12 transition-all duration-300 ease-in-out">
                                                    {MatchBeerIcon(bet.type, 35, 35)}
                                                </span>
                                            </div>
                                        </span>
                                    ))
                                }
                                {
                                    uncofirmedIncompleteBets.length > 0 &&
                                    <span className={classNames(
                                        StatusBackgroundColors.Orange,
                                        "group inline-flex p-2.5 rounded-md shadow-md text-center"
                                    )}>
                                        <div className="flex m-auto">
                                            <span className="text-paragraph font-bold">
                                                {uncofirmedIncompleteBets.length}
                                                <span className="font-normal">x</span>
                                            </span>
                                            &nbsp;
                                            <span className="text-paragraph font-extrabold">?</span>
                                        </div>
                                    </span>
                                }
                                {
                                    confirmedCompleteBets.length > 0 &&
                                    <span className={classNames(
                                        StatusBackgroundColors.Green,
                                        "group inline-flex p-2.5 rounded-md shadow-md text-center"
                                    )}>
                                        <div className="flex m-auto">
                                            <span className="text-paragraph font-bold">
                                                {confirmedCompleteBets.length}
                                                <span className="font-normal">x</span>
                                            </span>
                                            &nbsp;
                                            <span className="text-paragraph font-extrabold">✓</span>
                                        </div>
                                    </span>
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

            {/* Detailed Bets */}

            <div className={classNames(
                showDetails ? 'max-h-[2000px]' : 'max-h-0',
                "bg-white transition-all duration-150 ease-in-out overflow-hidden"
            )}>
                <ul role="list" className="p-4">
                    {beerguilty.bets.map((bet: Bet, betIdx: any) => (
                        <BetDetails bet={bet} total={beerguilty.bets.length} key={bet.id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}