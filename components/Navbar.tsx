/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, EmojiHappyIcon, EmojiSadIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import ExportedImage from "next-image-export-optimizer";
import { useUserContext } from '../context/userContext'
import { User } from 'firebase/auth'
import { Skeleton } from '@mui/material'
import { database } from "../firebase/firebaseAuth.client";
import { ref, set } from "firebase/database";
import { Beer } from './overview/list/BeerlistDetails';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function writeBetData(type: string, size: string, reason: string, user: User) {
    try {
        set(ref(database, `bets/${user.uid}`), {
            reason,
            size,
            type,
            timestamp: Date.now(),
        });
    } catch (e) {
        console.error(e);
    }
}


export default function Navbar() {

    const { user, logoutUser, loading, error }: any = useUserContext();

    const userNavigation = [
        { name: 'Your Profile', onClickFunction: () => { } },
        { name: 'Settings', onClickFunction: () => { } },
        { name: 'Sign out', onClickFunction: () => { logoutUser() } },
    ]
    const navigation = [
        { name: 'Owes Me', href: '', current: true },
        { name: 'My Debts', href: '', current: false }
    ]

    return (

        <Disclosure as="nav" className="bg-main mb-6">
            {({ open }) => (
                <div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-button-text hover:text-white hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="relative h-20 w-16">
                                        <ExportedImage
                                            src="/images/logo/beerlist_logo.png"
                                            alt="beerlist logo"
                                            layout="fill"
                                            objectFit="contain"
                                            unoptimized={true}
                                        />
                                    </div>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-secondary text-button-text hover:bg-tertiary hover:text-white' : 'text-paragraph hover:bg-tertiary hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium transition-colors ease-in-out'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => writeBetData('debt', 'small', Beer.Stout, user)}
                                        className="text-button-text relative inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md bg-tertiary hover:shadow-md hover:translate-x-0.5 transition-all duration-300 ease-in-out"
                                    >
                                        <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        <span>New Bet</span>
                                    </button>
                                </div>
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
                                                <span className="sr-only">Open user menu</span>
                                                {
                                                    user.photoURL ?
                                                        <ExportedImage
                                                            className="rounded-full"
                                                            src={user ? user.photoURL : ''}
                                                            alt="User"
                                                            width={46}
                                                            height={46}
                                                            unoptimized={true}
                                                        />
                                                        :
                                                        <Skeleton variant="circular" width={46} height={46} />
                                                }
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg rounded-md  bg-secondary">
                                                {userNavigation.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="hover:bg-tertiary  hover:shadow-xl transition-all duration-300 ease-in-out first:rounded-t-md last:rounded-b-md rounded-none "
                                                    >
                                                        <div
                                                            onClick={item.onClickFunction}
                                                            className='block px-4 py-2 text-sm text-button-text font-bold hover:translate-x-1 transition-all duration-300 ease-in-out cursor-pointer'
                                                        >
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu, show/hide based on menu open state. */}

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-secondary text-button-text hover:bg-tertiary hover:text-white' : 'text-paragraph hover:bg-tertiary hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="pt-4 pb-3">
                            <div className="flex items-center px-5 sm:px-6">
                                <div className="flex-shrink-0">
                                    {
                                        user.photoURL ?
                                            <ExportedImage
                                                className="rounded-full"
                                                src={user ? user.photoURL : ''}
                                                alt="User"
                                                width={46}
                                                height={46}
                                                unoptimized={true}
                                            />
                                            :
                                            <Skeleton variant="circular" width={46} height={46} />
                                    }

                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user ? user.displayName : ''}</div>
                                    <div className="text-sm font-medium text-gray-700">{user ? user.email : ''}</div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1 sm:px-3">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        onClick={item.onClickFunction}
                                        className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )

}
