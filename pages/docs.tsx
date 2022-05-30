import { BookOpenIcon, CashIcon, ChartPieIcon, LinkIcon, MailIcon, SpeakerphoneIcon, UserIcon } from "@heroicons/react/outline";
import { onValue, ref } from "firebase/database";
import ExportedImage from "next-image-export-optimizer"
import { useEffect, useState } from "react";
import { Beer, BeerIconLager, MatchBeerIcon } from "../components/icons/BeerIcons";
import { database } from "../firebase/firebaseAuth.client";
import CountUp from "react-countup";
import { HeartIcon } from "@heroicons/react/solid";

export default function Docs() {
    const [userCount, setUserCount] = useState(0);
    const [debtCount, setDebtCount] = useState(0);
    const ghActionRef: string = "https://github.com/gigu-io/beerlist/releases/tag/" + process.env.NEXT_PUBLIC_APP_VERSION

    useEffect(() => {
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
            setUserCount(snapshot.size);
        })
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const debtsRef = ref(database, 'debts');
        onValue(debtsRef, (snapshot) => {
            setDebtCount(snapshot.size);
        })
        // eslint-disable-next-line
    }, []);

    const getBeerTypeDescription = (beerType: Beer) => {
        switch (beerType) {
            case Beer.Lager:
                return "Lagers are a tighter group of beers than ales. While there are countless styles of ale, there are only a few styles within the lager family. Generally, the characteristics of a lager include a light, crisp taste that is mellow and smooth. They also tend to have more carbonation than ales and are less bitter.";
            case Beer.Dark:
                return "Dark/Amber beer showcases a medium-high to high malt character with medium to low caramel character derived from the use of roasted crystal malts. The American amber is characterized by American-variety hops, which lend the amber ale notes of citrus, fruit and pine to balance the sweetness of the malt.";
            case Beer.IPA:
                return "India Pale Ales (IPAs), which encompass numerous styles of beer, get their characteristics largely from hops and herbal, citrus or fruity flavors. They can be bitter and contain high alcohol levels, though the final product depends on the variety of hops used.";
            case Beer.Stout:
                return "Stout, dark, heavy-bodied beer popular in Great Britain and Ireland. Stouts are stronger versions of mild ale. There are various types, including oatmeal stout, milk stout, and imperial stout. Popular stouts have included the so-called dry Irish stouts, notably Guinness.";
            default:
                return "";
        }
    }


    return (
        <div className="relative pb-12">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                    
                    <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                        <svg
                            className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                            width={404}
                            height={392}
                            fill="none"
                            viewBox="0 0 404 392"
                        >
                            <defs>
                                <pattern
                                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-secondary" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                        </svg>
                    </div>
                    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                        {/* Testimonial card*/}


                        <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none sm:hover:scale-105 hover:active:scale-105 transition-all duration-150 ease-in-out">
                            <blockquote className="relative bg-white rounded-lg shadow-lg">
                                <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                                    <div className="relative text-lg text-gray-700 font-medium mt-8">
                                        <svg
                                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                                            fill="currentColor"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                        <p className="relative">
                                            Trying to connect people with little projects that they can use to make their lives easier.
                                        </p>
                                    </div>
                                </div>
                                <cite className="relative flex items-center sm:items-start bg-secondary rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
                                    <span className="relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:transform sm:-translate-y-1/2">

                                        <div
                                            className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
                                        >
                                            <ExportedImage
                                                className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
                                                src="/images/janlauber.jpeg"
                                                alt="Jan Lauber"
                                                layout="fill"
                                                objectFit='contain'
                                            // unoptimized={true}
                                            />
                                        </div>
                                    </span>
                                    <span className="relative ml-4 text-gray-700 font-semibold leading-6 sm:ml-24 sm:pl-1">
                                        <span className="text-white font-semibold sm:inline">Jan Lauber</span>{' '}
                                        <span className="sm:inline">full-stack developer</span>
                                    </span>
                                </cite>
                            </blockquote>
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 mt-20">
                            Beer Types
                        </h1>

                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10"
                        >

                            {
                                // Foreach enum value of Beer
                                Object.values(Beer).map((beertype) => {
                                    return (
                                        <div
                                            className="relative sm:hover:rotate-2 transition-all duration-300 ease-in-out flex-col gap-4 items-center bg-white border-2 border-gray-500 shadow-md rounded-lg"
                                            key={beertype}
                                        >
                                            <div
                                                className="w-full bg-gray-500 py-4"
                                            >
                                                <span
                                                    className=" inset-0 flex items-center justify-center"
                                                >
                                                    <span
                                                        className="bg-white rounded-full p-4 shadow-xl"
                                                    >
                                                        {MatchBeerIcon(beertype, 60, 60)}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="mt-4 text-2xl font-bold text-center p-2">
                                                {beertype}
                                            </div>
                                            <div
                                                className=" text-sm text-gray-500 p-4"
                                            >
                                                {getBeerTypeDescription(beertype)}
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                    {/* Content area */}
                    <div className="pt-12 sm:pt-12 lg:pt-20">
                        <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                            Documentation
                        </h2>
                        <div className="mt-6 text-gray-700 space-y-6">
                            <p className="text-lg">
                                A casual evening out with friends and suddenly you&apos;ve won a bet for a beer or someone owes you a beer for something you did for them. <br />
                                <strong>How do you keep track of these debts?</strong>
                            </p>
                            <p className="text-lg leading-7 text-gray-900">
                                <BookOpenIcon className="block m-auto w-10 h-10" />
                            </p>
                            <p className="text-lg leading-7">
                                See who owes you beer and how much you owe them.
                                Also see the debt history.
                                Choose between <strong>4 different types</strong> of beer (Lager, Dark, IPA, Stout) and <strong>3 sizes</strong> (0.33l, 0.5l, 0.75l) for each debt.
                                Write a short reason why someone owes you beer (max. 100 characters).
                                Each user can owe you <strong>max. 24</strong> beers.
                                Delete old debts and add new ones when your limit is reached.
                            </p>
                            <p className="text-lg leading-7 text-gray-900">
                                <MailIcon className="block m-auto w-10 h-10" />
                            </p>
                            <p className="text-lg leading-7">
                                An email notification is sent to the user who owes you beer if his email notification is enabled.
                                You can deactivate the email notification for yourself under the profile page.
                            </p>
                            <p className="text-lg leading-7 text-gray-900">
                                <CashIcon className="block m-auto w-10 h-10" />
                            </p>
                            <p className="text-lg leading-7">
                                You can <strong>buy me a coffee</strong> if you like this project. The button is always at the bottom right.
                            </p>
                        </div>
                    </div>

                    {/* Stats section */}
                    <div className="mt-10 pt-8 bg-white p-6 rounded-lg shadow-lg">

                        <dl className="grid grid-cols-1 sm:grid-cols-2 text-center sm:text-left gap-x-4 gap-y-4">
                            <div className=" pt-2">
                                <dt className="text-base font-medium text-gray-500">Active Users</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    <CountUp
                                        start={0}
                                        end={userCount}
                                        duration={1}
                                    />
                                </dd>
                            </div>

                            <div className="pt-2">
                                <dt className="text-base font-medium text-gray-500 inline">Added Beer Debts</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900"><CountUp
                                    start={0}
                                    end={debtCount}
                                    duration={1}
                                /></dd>
                            </div>

                            <div className="pt-2">
                                <dt className="text-base font-medium text-gray-500">Founded</dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">2022</dd>
                            </div>

                            <div className="pt-2">
                                <dt className="text-base font-medium text-gray-500">Version</dt>
                                <a
                                    href={ghActionRef}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Show Changelog"
                                >
                                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{process.env.NEXT_PUBLIC_APP_VERSION} <LinkIcon className="inline w-6 h-6" /></dd>
                                </a>
                            </div>
                        </dl>
                        <div className="mt-10 text-center sm:text-left">
                            <a href="https://github.com/gigu-io/beerlist" className="text-base font-bold text-gray-700" target="_blank" rel="noreferrer">
                                {' '}
                                View the source code <span aria-hidden="true">&rarr;</span>{' '}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
